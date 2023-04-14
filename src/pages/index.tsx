import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import WeatherCard, { WeatherProps } from "@/components/WeatherCard";
import SearchForm from "@/components/Form";
import { RemoteLoadWeather } from "@/data/usecases/remote-load-weather/remote-load-weather";

import { AxiosHttpGetClient } from "@/infra/http/axios-http-get-client";

const Home: React.FC = () => {
  const httpGetClient = new AxiosHttpGetClient();
  const loadWeather = new RemoteLoadWeather(httpGetClient);

  const [forecast, setForecast] = useState<WeatherProps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState("");

  const fetchWeather = async (query: string) => {
    setError("");
    setForecast([]);
    try {
      const response = await loadWeather.load(`api/weather?${query}`);
      setForecast(response);
    } catch (error: any) {
      setForecast([]);
      setError(error?.message);
    }
  };

  const onSearch = (param: string) => {
    fetchWeather(param);
  };

  return (
    <>
      <Head>
        <title>Forecast</title>
        <meta name="description" content="Forecast Victor Biasibetti" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <SearchForm onSearch={onSearch} />
        {error && <span>{error}</span>}
        <div className={styles.center}>
          {forecast &&
            forecast.map((fore) => (
              <WeatherCard
                weather={fore}
                key={fore.name}
                onSetTitle={(value: string) => setTitle(value)}
              />
            ))}
        </div>
        <h4>{title}</h4>
      </main>
    </>
  );
};

export default Home;
