import React from "react";
import styles from "./styles.module.css";

export type WeatherProps = {
  name: string;
  temperature: number;
  temperatureMin: number;
  temperatureUnit: string;
  detailedForecast: string;
  startTime: Date;
};

type Props = {
  weather: WeatherProps;
  onSetTitle: (title: string) => void;
};

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WeatherCard: React.FC<Props> = (props: Props) => {
  const { weather, onSetTitle } = props;
  console.log({ weather });
  const date = new Date(weather.startTime);
  const day = weekday[date.getDay()];
  return (
    <div
      className={styles.wrapper}
      onClick={() => onSetTitle(weather.detailedForecast)}
    >
      <span>{`${day}`}</span>
      <>
        <span>
          {`${weather.temperature}`}
          <span
            style={{ fontSize: "10px" }}
          >{`${weather.temperatureUnit}`}</span>
        </span>
        <span>
          {`${weather.temperatureMin}`}
          <span
            style={{ fontSize: "10px" }}
          >{`${weather.temperatureUnit}`}</span>
        </span>
      </>
    </div>
  );
};

export default WeatherCard;
