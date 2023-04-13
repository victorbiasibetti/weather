import { WeatherModel } from "../models/weather";

export interface LoadWeather {
  load: () => Promise<WeatherModel[]>;
}
