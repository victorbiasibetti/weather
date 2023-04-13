import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpGetClient implements HttpGetClient {
  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.get(params.url);
    } catch (error: any) {
      axiosResponse = error?.response;
    }
    return this.adapt(axiosResponse);
  }

  private adapt(axiosResponse: AxiosResponse): HttpResponse<any> {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
