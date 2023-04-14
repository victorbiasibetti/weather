import { WeatherModel } from "../models/weather";

export interface LoadWeather {
  load: (query: string) => Promise<WeatherModel[]>;
}
