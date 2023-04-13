import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { WeatherModel } from "@/domain/models/weather";
import { LoadWeather } from "@/domain/usecases/load-weather";

export class RemoteLoadWeather implements LoadWeather {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<WeatherModel[]>
  ) {}

  async load(): Promise<WeatherModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
    const remoteWeathers = httpResponse.body || [];
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteWeathers;
      default:
        throw new UnexpectedError();
    }
  }
}
