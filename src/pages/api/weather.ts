import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let mode = "onelineaddress";
    let benchmark = "2020";

    let params = req.url?.split("?")[1];

    const url = `https://geocoding.geo.census.gov/geocoder/locations/${mode}?${params}&benchmark=${benchmark}&format=json`;

    const result = await fetch(
      url,
      // "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=4600+Silver+Hill+Rd%2C+Washington%2C+DC+20233&benchmark=2020&format=json",
      // "https://geocoding.geo.census.gov/geocoder/locations/address?street=4600+Silver+Hill+Rd%2C+Washington%2C+DC+20233&benchmark=Public_AR_Census2020&format=json",
      {
        method: "GET",
        mode: "no-cors",
      }
    ).then((res) => res.json());

    if (result?.result?.addressMatches.length == 0) {
      throw new Error("no data for this address");
    }

    const { x, y } = result?.result?.addressMatches[0]?.coordinates;
    const coordinatesPointsUrl = `https://api.weather.gov/points/${y},${x}`;
    const coordinatesResult = await fetch(coordinatesPointsUrl, {
      method: "GET",
    }).then((res) => res.json());

    const forecast = await fetch(coordinatesResult?.properties?.forecast, {
      method: "GET",
    }).then((res) => res.json());

    const { periods } = forecast?.properties;
    let resumePeriods = [];

    for (let i = 0; i < periods.length; i += 2) {
      resumePeriods.push({
        ...periods[i],
        temperatureMin: periods[i + 1].temperature,
      });
    }

    res.status(200).json(resumePeriods);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export default handler;
