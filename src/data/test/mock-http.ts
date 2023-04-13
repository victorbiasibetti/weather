import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
  HttpStatusCode,
} from "../protocols/http";

export const mockGetRequest = (): HttpGetParams => ({
  url: "www.urlfake.com",
});

export class HttpGetClientSpy<ResponseType = any>
  implements HttpGetClient<ResponseType>
{
  url: string = "";
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok,
  };

  async get(params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    this.url = params.url;
    return this.response;
  }
}
