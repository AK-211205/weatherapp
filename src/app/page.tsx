
"use client";

import Container from "@/components/Container";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import Navbar from "@/components/Navbar";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherIcon from "@/components/WeatherIcon";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { metersToKilometers } from "@/utils/metersToKilometers";
import axios from "axios";
import { format } from "date-fns";
import { useQuery } from "react-query";
import { loadingCityAtom, placeAtom, coordinatesAtom } from "./atom";
import { useAtom } from "jotai";
interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
    pressure_msl: number[];
    visibility: number[];
    weathercode: number[];
  };
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
  };
}

export default function Home() {
  const [place] = useAtom(placeAtom);
  const [coordinates, setCoordinates] = useAtom(coordinatesAtom);
  const [loadingCity] = useAtom(loadingCityAtom);

  // Fetch coordinates for the place name
  const { isLoading: isGeocodingLoading } = useQuery(
    ["geocoding", place],
    async () => {
      const { data } = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=1`
      );
      return data;
    },
    {
      enabled: !!place,
      onSuccess: (data) => {
        if (data?.results?.length > 0) {
          setCoordinates({
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude
          });
        }
      },
    }
  );

  // Fetch weather data using coordinates
  const { isLoading, error, data } = useQuery<WeatherData>(
    ["weather", coordinates],
    async () => {
      const { data } = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,pressure_msl,visibility,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=8`
      );
      return data;
    },
    {
      enabled: !!coordinates.latitude && !!coordinates.longitude,
      refetchOnMount: true,
    }
  );

  const weatherCodeToCondition = (code: number): string => {
    const codes: Record<number, string> = {
      0: 'Clear',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Fog',
      51: 'Drizzle',
      53: 'Drizzle',
      55: 'Drizzle',
      56: 'Freezing Drizzle',
      57: 'Freezing Drizzle',
      61: 'Rain',
      63: 'Rain',
      65: 'Rain',
      66: 'Freezing Rain',
      67: 'Freezing Rain',
      71: 'Snow',
      73: 'Snow',
      75: 'Snow',
      77: 'Snow Grains',
      80: 'Rain Showers',
      81: 'Rain Showers',
      82: 'Rain Showers',
      85: 'Snow Showers',
      86: 'Snow Showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm',
      99: 'Thunderstorm',
    };
    return codes[code] || 'Unknown';
  };

  if (isLoading || isGeocodingLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="text-red-400">Failed to fetch weather data</p>
      </div>
    );

  // Get the first hour's data for today's details
  const firstHourData = data?.hourly.time[0];
  const hourlyIndex = data?.hourly.time.findIndex(time => time === firstHourData) || 0;

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar location={place} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {loadingCity ? (
          <WeatherSkeleton />
        ) : (
          <>
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl items-end">
                  <p>{data?.current_weather.time ? format(new Date(data.current_weather.time), "EEEE") : ""}</p>
                  <p className="text-lg">
                    {data?.current_weather.time ? `(${format(new Date(data.current_weather.time), "dd.MM.yyyy")})` : ""}
                  </p>
                </h2>
                <Container className="gap-10 px-6 items-center">
                  <div className="flex flex-col px-4">
                    <span className="text-5xl">
                      {data?.current_weather.temperature ?? 0}°
                    </span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                      <span>Feels like</span>
                      <span>{data?.current_weather.temperature ?? 0}°</span>
                    </p>
                    <p className="text-xs space-x-2">
                      <span>{data?.daily.temperature_2m_min[0] ?? 0}°↓</span>
                      <span>{data?.daily.temperature_2m_max[0] ?? 0}°↑</span>
                    </p>
                  </div>
                  <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                    {data?.hourly.time.slice(0, 24).map((time, i) => (
                      <div
                        key={i}
                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                      >
                        <p className="whitespace-nowrap">
                          {format(new Date(time), "h:mm a")}
                        </p>
                        <WeatherIcon 
                          iconName={getDayOrNightIcon(
                            data.hourly.weathercode?.[i] ?? data.daily.weathercode[0],
                            time
                          )} 
                        />
                        <p>{data.hourly.temperature_2m[i]}°</p>
                      </div>
                    ))}
                  </div>
                </Container>
              </div>
              <div className="flex gap-4">
                <Container className="w-fit justify-center flex-col px-4 items-center">
                  <p className="capitalize text-center">
                    {weatherCodeToCondition(data?.current_weather.weathercode ?? 0)}
                  </p>
                  <WeatherIcon 
                    iconName={getDayOrNightIcon(
                      data?.current_weather.weathercode ?? 0,
                      data?.current_weather.time ?? ""
                    )} 
                  />
                </Container>
                <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
                  <WeatherDetails
                    visability={metersToKilometers(data?.hourly.visibility[hourlyIndex] ?? 10000)}
                    airPressure={`${data?.hourly.pressure_msl[hourlyIndex]} hPa`}
                    humidity={`${data?.hourly.relativehumidity_2m[hourlyIndex]}%`}
                    sunrise={data?.daily.sunrise[0] ? format(new Date(data.daily.sunrise[0]), "H:mm") : "N/A"}
                    sunset={data?.daily.sunset[0] ? format(new Date(data.daily.sunset[0]), "H:mm") : "N/A"}
                    windSpeed={convertWindSpeed(data?.current_weather.windspeed ?? 1.64)}
                  />
                </Container>
              </div>
            </section>

            <section className="flex w-full flex-col gap-4">
              <p className="text-2xl">Forecast (7 days)</p>
              {data?.daily.time.slice(1, 8).map((date, i) => (
                <ForecastWeatherDetail
                  key={i}
                  description={weatherCodeToCondition(data.daily.weathercode[i+1])}
                  weatherIcon={getDayOrNightIcon(data.daily.weathercode[i+1], date + "T12:00")}
                  date={format(new Date(date), "dd.MM")}
                  day={format(new Date(date), "EEEE")}
                  feels_like={data.daily.temperature_2m_max[i+1]}
                  temp={data.daily.temperature_2m_max[i+1]}
                  temp_max={data.daily.temperature_2m_max[i+1]}
                  temp_min={data.daily.temperature_2m_min[i+1]}
                  airPressure={`${data.hourly.pressure_msl[i]} hPa`}
                  humidity={`${data.hourly.relativehumidity_2m[i]}%`}
                  sunrise={format(new Date(data.daily.sunrise[i+1]), "H:mm")}
                  sunset={format(new Date(data.daily.sunset[i+1]), "H:mm")}
                  visability={`${metersToKilometers(data.hourly.visibility[i] ?? 10000)}`}
                  windSpeed={`${convertWindSpeed(data.current_weather.windspeed ?? 1.64)}`}
                />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function WeatherSkeleton() {
  return (
    <section className="space-y-8">
      <div className="space-y-2 animate-pulse">
        <div className="flex gap-1 text-2xl items-end">
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 animate-pulse">
        <p className="text-2xl h-8 w-36 bg-gray-300 rounded"></p>
        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
          <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </section>
  );
}