import { HttpGetClientSpy } from "@/data/test";
import { HttpStatusCode } from "@/data/protocols/http";

import { WeatherModel } from "@/domain/models/weather";
import { UnexpectedError } from "@/domain/errors";
import { RemoteLoadWeather } from "./remote-load-weather";

export const mockRemoteWeather = (): WeatherModel[] => [
  {
    name: "",
    detailedForecast: "",
    startTime: new Date(),
    temperature: 10,
    temperatureMin: 0,
    temperatureUnit: "F",
  },
];

type SutTypes = {
  sut: RemoteLoadWeather;
  httpGetClientSpy: HttpGetClientSpy<WeatherModel[]>;
};
const makeSut = (url: string = "www.urlfake.com"): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<WeatherModel[]>();
  const sut = new RemoteLoadWeather(url, httpGetClientSpy);
  return { sut, httpGetClientSpy };
};

describe("RemoteLoadWeather", () => {
  test("Should call HttpGetClient with correct URL", async () => {
    const url = "www.correcturl.com";
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test("Should throw UnexpectedError with HttpGetClient return 400", () => {
    const { httpGetClientSpy, sut } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.load();
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return a list of Weather if HttpGetClient return 200", async () => {
    const { httpGetClientSpy, sut } = makeSut();
    const httpResult = mockRemoteWeather();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const weathers = await sut.load();
    expect(weathers).toEqual([
      {
        name: "",
        detailedForecast: "",
        startTime: new Date(),
        temperature: 10,
        temperatureMin: 0,
        temperatureUnit: "F",
      },
    ]);
  });
});
