import axios from "axios";

export const mockHttpResponse = (): any => ({
  body: { content: "value" },
  statusCode: 0,
});

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  mockedAxios.get.mockResolvedValue(mockHttpResponse());

  return mockedAxios;
};
