import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import WeatherCard, { WeatherProps } from "@/components/WeatherCard";
import SearchForm from "@/components/Form";

export default function Home() {
  const [forecast, setForecast] = useState<WeatherProps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState("");

  const fetchData = async (query: string) => {
    setError("");
    await fetch(`api/weather?${query}`)
      .then((response) => {
        if (response.status == 400) throw Error("Failed request, try again");
        return response.json();
      })
      .then((data) => {
        setForecast(data);
      })
      .catch((error) => {
        setForecast([]);
        setError(error?.message);
      });
  };

  const onSearch = (param: string) => {
    fetchData(param);
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
}
