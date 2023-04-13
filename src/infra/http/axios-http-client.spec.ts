import { AxiosHttpGetClient } from "./axios-http-get-client";
import { mockAxios, mockHttpResponse } from "@/infra/test";
import { mockGetRequest } from "@/data/test";

import axios from "axios";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpGetClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpGetClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};
describe("AxiosHttpClient", () => {
  describe("get", () => {
    test("Should call axios.get with correct values", async () => {
      const request = mockGetRequest();
      const { sut, mockedAxios } = makeSut();
      await sut.get(request);
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url);
    });

    test("Should return correct response on axios.get", async () => {
      const { sut, mockedAxios } = makeSut();
      const httpResponse = await sut.get(mockGetRequest());
      const axiosResponse = await mockedAxios.get.mock.results[0].value;
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      });
    });

    test("Should return correct error on axios.get", () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.get.mockRejectedValueOnce({
        response: mockHttpResponse(),
      });
      const promise = sut.get(mockGetRequest());
      expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
    });
  });
});
