import { HttpGetClientSpy } from "@/data/test";
import { HttpStatusCode } from "@/data/protocols/http";

import { WeatherModel } from "@/domain/models/weather";
import { UnexpectedError } from "@/domain/errors";
import { RemoteLoadWeather } from "./remote-load-weather";

export const mockRemoteWeather = (
  startTime: Date = new Date()
): WeatherModel[] => [
  {
    name: "",
    detailedForecast: "",
    startTime: startTime,
    temperature: 10,
    temperatureMin: 0,
    temperatureUnit: "F",
  },
];

type SutTypes = {
  sut: RemoteLoadWeather;
  httpGetClientSpy: HttpGetClientSpy<WeatherModel[]>;
};
const url = "www.correcturl.com?query";

const makeSut = (): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<WeatherModel[]>();
  const sut = new RemoteLoadWeather(httpGetClientSpy);
  return { sut, httpGetClientSpy };
};

describe("RemoteLoadWeather", () => {
  test("Should call HttpGetClient with correct URL", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    await sut.load(url);
    expect(httpGetClientSpy.url).toBe(url);
  });

  test("Should throw UnexpectedError with HttpGetClient return 400", () => {
    const { httpGetClientSpy, sut } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.load(url);
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return a list of Weather if HttpGetClient return 200", async () => {
    const { httpGetClientSpy, sut } = makeSut();
    const startTime = new Date();
    const httpResult = mockRemoteWeather(startTime);

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const weathers = await sut.load(url);
    expect(weathers).toEqual([
      {
        name: "",
        detailedForecast: "",
        startTime,
        temperature: 10,
        temperatureMin: 0,
        temperatureUnit: "F",
      },
    ]);
  });
});
