// // /** @format */
// // "use client";

// // import Container from "@/components/Container";
// // import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
// // import Navbar from "@/components/Navbar";
// // import WeatherDetails from "@/components/WeatherDetails";
// // import WeatherIcon from "@/components/WeatherIcon";
// // import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
// // import { convertWindSpeed } from "@/utils/convertWindSpeed";
// // import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
// // import { metersToKilometers } from "@/utils/metersToKilometers";
// // import axios from "axios";
// // import { format, fromUnixTime, parseISO } from "date-fns";
// // import Image from "next/image";
// // import { useQuery } from "react-query";
// // import { loadingCityAtom, placeAtom } from "./atom";
// // import { useAtom } from "jotai";
// // import { useEffect } from "react";
// // // import { format as dateFromate } from "date-format";

// // // var format = require('date-format');
// // // format('hh:mm:ss.SSS', new Date()); // just the time
// // interface WeatherDetail {
// //   dt: number;
// //   main: {
// //     temp: number;
// //     feels_like: number;
// //     temp_min: number;
// //     temp_max: number;
// //     pressure: number;
// //     sea_level: number;
// //     grnd_level: number;
// //     humidity: number;
// //     temp_kf: number;
// //   };
// //   weather: {
// //     id: number;
// //     main: string;
// //     description: string;
// //     icon: string;
// //   }[];
// //   clouds: {
// //     all: number;
// //   };
// //   wind: {
// //     speed: number;
// //     deg: number;
// //     gust: number;
// //   };
// //   visibility: number;
// //   pop: number;
// //   sys: {
// //     pod: string;
// //   };
// //   dt_txt: string;
// // }

// // interface WeatherData {
// //   cod: string;
// //   message: number;
// //   cnt: number;
// //   list: WeatherDetail[];
// //   city: {
// //     id: number;
// //     name: string;
// //     coord: {
// //       lat: number;
// //       lon: number;
// //     };
// //     country: string;
// //     population: number;
// //     timezone: number;
// //     sunrise: number;
// //     sunset: number;
// //   };
// // }

// // export default function Home() {
// //   const [place, setPlace] = useAtom(placeAtom);
// //   const [loadingCity] = useAtom(loadingCityAtom);

// //   const { isLoading, error, data, refetch } = useQuery<WeatherData>(
// //     "repoData",
// //     async () => {
// //       const { data } = await axios.get(
// //         `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=4816d7a676856f1938c6ba6397aeb7c3&cnt=56`
// //       );
// //       return data;
// //     }
// //   );

// //   useEffect(() => {
// //     refetch();
// //   }, [place, refetch]);

// //   const firstData = data?.list[0];

// //   // console.log("error", error);

// //   console.log("data", data);

// //   const uniqueDates = [
// //     ...new Set(
// //       data?.list.map(
// //         (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
// //       )
// //     )
// //   ];

// //   // Filtering data to get the first entry after 6 AM for each unique date
// //   const firstDataForEachDate = uniqueDates.map((date) => {
// //     return data?.list.find((entry) => {
// //       const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
// //       const entryTime = new Date(entry.dt * 1000).getHours();
// //       return entryDate === date && entryTime >= 6;
// //     });
// //   });

// //   if (isLoading)
// //     return (
// //       <div className="flex items-center min-h-screen justify-center">
// //         <p className="animate-bounce">Loading...</p>
// //       </div>
// //     );
// //   if (error)
// //     return (
// //       <div className="flex items-center min-h-screen justify-center">
// //         {/* @ts-ignore */}
// //         <p className="text-red-400">{error.message}</p>
// //       </div>
// //     );
// //   return (
// //     <div className="flex flex-col gap-4 bg-gray-100 min-h-screen ">
// //       <Navbar location={data?.city.name} />
// //       <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9  w-full  pb-10 pt-4 ">
// //         {/* today data  */}
// //         {loadingCity ? (
// //           <WeatherSkeleton />
// //         ) : (
// //           <>
// //             <section className="space-y-4 ">
// //               <div className="space-y-2">
// //                 <h2 className="flex gap-1 text-2xl  items-end ">
// //                   <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
// //                   <p className="text-lg">
// //                     ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
// //                   </p>
// //                 </h2>
// //                 <Container className=" gap-10 px-6 items-center">
// //                   {/* temprature */}
// //                   <div className=" flex flex-col px-4 ">
// //                     <span className="text-5xl">
// //                       {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
// //                     </span>
// //                     <p className="text-xs space-x-1 whitespace-nowrap">
// //                       <span> Feels like</span>
// //                       <span>
// //                         {convertKelvinToCelsius(
// //                           firstData?.main.feels_like ?? 0
// //                         )}
// //                         °
// //                       </span>
// //                     </p>
// //                     <p className="text-xs space-x-2">
// //                       <span>
// //                         {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
// //                         °↓{" "}
// //                       </span>
// //                       <span>
// //                         {" "}
// //                         {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
// //                         °↑
// //                       </span>
// //                     </p>
// //                   </div>
// //                   {/* time  and weather  icon */}
// //                   <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
// //                     {data?.list.map((d, i) => (
// //                       <div
// //                         key={i}
// //                         className="flex flex-col justify-between gap-2 items-center text-xs font-semibold "
// //                       >
// //                         <p className="whitespace-nowrap">
// //                           {format(parseISO(d.dt_txt), "h:mm a")}
// //                         </p>

// //                         {/* <WeatherIcon iconName={d.weather[0].icon} /> */}
// //                         <WeatherIcon
// //                           iconName={getDayOrNightIcon(
// //                             d.weather[0].icon,
// //                             d.dt_txt
// //                           )}
// //                         />
// //                         <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </Container>
// //               </div>
// //               <div className=" flex gap-4">
// //                 {/* left  */}
// //                 <Container className="w-fit  justify-center flex-col px-4 items-center ">
// //                   <p className=" capitalize text-center">
// //                     {firstData?.weather[0].description}{" "}
// //                   </p>
// //                   <WeatherIcon
// //                     iconName={getDayOrNightIcon(
// //                       firstData?.weather[0].icon ?? "",
// //                       firstData?.dt_txt ?? ""
// //                     )}
// //                   />
// //                 </Container>
// //                 <Container className="bg-yellow-300/80  px-6 gap-4 justify-between overflow-x-auto">
// //                   <WeatherDetails
// //                     visability={metersToKilometers(
// //                       firstData?.visibility ?? 10000
// //                     )}
// //                     airPressure={`${firstData?.main.pressure} hPa`}
// //                     humidity={`${firstData?.main.humidity}%`}
// //                     sunrise={format(data?.city.sunrise ?? 1702949452, "H:mm")}
// //                     // sunrise={}
// //                     sunset={format(data?.city.sunset ?? 1702517657, "H:mm")}
// //                     windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
// //                   />
// //                 </Container>
// //                 {/* right  */}
// //               </div>
// //             </section>

// //             {/* 7 day forcast data  */}
// //             <section className="flex w-full flex-col gap-4  ">
// //               <p className="text-2xl">Forcast (7 days)</p>
// //               {firstDataForEachDate.map((d, i) => (
// //                 <ForecastWeatherDetail
// //                   key={i}
// //                   description={d?.weather[0].description ?? ""}
// //                   weatehrIcon={d?.weather[0].icon ?? "01d"}
// //                   date={d ? format(parseISO(d.dt_txt), "dd.MM") : ""}
// //                   day={d ? format(parseISO(d.dt_txt), "dd.MM") : "EEEE"}
// //                   feels_like={d?.main.feels_like ?? 0}
// //                   temp={d?.main.temp ?? 0}
// //                   temp_max={d?.main.temp_max ?? 0}
// //                   temp_min={d?.main.temp_min ?? 0}
// //                   airPressure={`${d?.main.pressure} hPa `}
// //                   humidity={`${d?.main.humidity}% `}
// //                   sunrise={format(
// //                     fromUnixTime(data?.city.sunrise ?? 1702517657),
// //                     "H:mm"
// //                   )}
// //                   sunset={format(
// //                     fromUnixTime(data?.city.sunset ?? 1702517657),
// //                     "H:mm"
// //                   )}
// //                   visability={`${metersToKilometers(d?.visibility ?? 10000)} `}
// //                   windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
// //                 />
// //               ))}
// //             </section>
// //           </>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }

// // function WeatherSkeleton() {
// //   return (
// //     <section className="space-y-8 ">
// //       {/* Today's data skeleton */}
// //       <div className="space-y-2 animate-pulse">
// //         {/* Date skeleton */}
// //         <div className="flex gap-1 text-2xl items-end ">
// //           <div className="h-6 w-24 bg-gray-300 rounded"></div>
// //           <div className="h-6 w-24 bg-gray-300 rounded"></div>
// //         </div>

// //         {/* Time wise temperature skeleton */}
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //           {[1, 2, 3, 4].map((index) => (
// //             <div key={index} className="flex flex-col items-center space-y-2">
// //               <div className="h-6 w-16 bg-gray-300 rounded"></div>
// //               <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
// //               <div className="h-6 w-16 bg-gray-300 rounded"></div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* 7 days forecast skeleton */}
// //       <div className="flex flex-col gap-4 animate-pulse">
// //         <p className="text-2xl h-8 w-36 bg-gray-300 rounded"></p>

// //         {[1, 2, 3, 4, 5, 6, 7].map((index) => (
// //           <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
// //             <div className="h-8 w-28 bg-gray-300 rounded"></div>
// //             <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
// //             <div className="h-8 w-28 bg-gray-300 rounded"></div>
// //             <div className="h-8 w-28 bg-gray-300 rounded"></div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }





// /** @format */
// "use client";

// import Container from "@/components/Container";
// import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
// import Navbar from "@/components/Navbar";
// import WeatherDetails from "@/components/WeatherDetails";
// import WeatherIcon from "@/components/WeatherIcon";
// import { convertWindSpeed } from "@/utils/convertWindSpeed";
// import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
// import { metersToKilometers } from "@/utils/metersToKilometers";
// import axios from "axios";
// import { format, fromUnixTime } from "date-fns";
// import { useQuery } from "react-query";
// import { loadingCityAtom, placeAtom, coordinatesAtom } from "./atom";
// import { useAtom } from "jotai";
// import { useEffect, useState } from "react";

// interface WeatherData {
//   latitude: number;
//   longitude: number;
//   timezone: string;
//   timezone_abbreviation: string;
//   elevation: number;
//   hourly: {
//     time: string[];
//     temperature_2m: number[];
//     weathercode: number[];
//     windspeed_10m: number[];
//     relativehumidity_2m: number[];
//     pressure_msl: number[];
//     visibility: number[];
//   };
//   daily: {
//     time: string[];
//     weathercode: number[];
//     temperature_2m_max: number[];
//     temperature_2m_min: number[];
//     sunrise: string[];
//     sunset: string[];
//   };
// }

// interface ProcessedWeatherData {
//   dt: number;
//   main: {
//     temp: number;
//     feels_like: number;
//     temp_min: number;
//     temp_max: number;
//     pressure: number;
//     humidity: number;
//   };
//   weather: {
//     id: number;
//     main: string;
//     description: string;
//     icon: string;
//   }[];
//   wind: {
//     speed: number;
//   };
//   visibility: number;
//   dt_txt: string;
// }

// export default function Home() {
//   const [place, setPlace] = useAtom(placeAtom);
//   const [coordinates, setCoordinates] = useAtom(coordinatesAtom);
//   const [loadingCity] = useAtom(loadingCityAtom);
//   const [processedData, setProcessedData] = useState<ProcessedWeatherData[]>([]);

//   // Fetch coordinates for the place name
//   const { isLoading: isGeocodingLoading } = useQuery(
//     ["geocoding", place],
//     async () => {
//       const { data } = await axios.get(
//         `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=1`
//       );
//       return data;
//     },
//     {
//       enabled: !!place,
//       onSuccess: (data) => {
//         if (data?.results?.length > 0) {
//           setCoordinates({
//             latitude: data.results[0].latitude,
//             longitude: data.results[0].longitude
//           });
//         }
//       },
//     }
//   );

//   // Fetch weather data using coordinates
//   const { isLoading, error, data } = useQuery<WeatherData>(
//     ["weather", coordinates],
//     async () => {
//       const { data } = await axios.get(
//         `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m,pressure_msl,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
//       );
//       console.log(data);
//       return data;
      
//     },
//     {
//       enabled: !!coordinates.latitude && !!coordinates.longitude,
//       onSuccess: (data) => {
//         if (data) {
//           const processed = processWeatherData(data);
//           setProcessedData(processed);
//         }
//       },
//     }
//   );

//   const processWeatherData = (data: WeatherData): ProcessedWeatherData[] => {
//     return data.hourly.time.map((time, index) => ({
//       dt: new Date(time).getTime() / 1000,
//       main: {
//         temp: data.hourly.temperature_2m[index],
//         feels_like: data.hourly.temperature_2m[index],
//         temp_min: getDailyMinTemp(data, time),
//         temp_max: getDailyMaxTemp(data, time),
//         pressure: data.hourly.pressure_msl[index],
//         humidity: data.hourly.relativehumidity_2m[index],
//       },
//       weather: [{
//         id: data.hourly.weathercode[index],
//         main: weatherCodeToCondition(data.hourly.weathercode[index]),
//         description: weatherCodeToDescription(data.hourly.weathercode[index]),
//         icon: getDayOrNightIcon(data.hourly.weathercode[index], time),
//       }],
//       wind: {
//         speed: data.hourly.windspeed_10m[index],
//       },
//       visibility: data.hourly.visibility[index],
//       dt_txt: time,
//     }));
//   };
//   console.log("processedData", processedData);

//   const getDailyMinTemp = (data: WeatherData, time: string): number => {
//     const date = time.split('T')[0];
//     const dayIndex = data.daily.time.findIndex(dailyDate => dailyDate === date);
//     return dayIndex >= 0 ? data.daily.temperature_2m_min[dayIndex] : 0;
//   };

//   const getDailyMaxTemp = (data: WeatherData, time: string): number => {
//     const date = time.split('T')[0];
//     const dayIndex = data.daily.time.findIndex(dailyDate => dailyDate === date);
//     return dayIndex >= 0 ? data.daily.temperature_2m_max[dayIndex] : 0;
//   };

//   const weatherCodeToCondition = (code: number): string => {
//     const codes: Record<number, string> = {
//       0: 'Clear',
//       1: 'Mainly Clear',
//       2: 'Partly Cloudy',
//       3: 'Overcast',
//       45: 'Fog',
//       48: 'Fog',
//       51: 'Drizzle',
//       53: 'Drizzle',
//       55: 'Drizzle',
//       56: 'Freezing Drizzle',
//       57: 'Freezing Drizzle',
//       61: 'Rain',
//       63: 'Rain',
//       65: 'Rain',
//       66: 'Freezing Rain',
//       67: 'Freezing Rain',
//       71: 'Snow',
//       73: 'Snow',
//       75: 'Snow',
//       77: 'Snow Grains',
//       80: 'Rain Showers',
//       81: 'Rain Showers',
//       82: 'Rain Showers',
//       85: 'Snow Showers',
//       86: 'Snow Showers',
//       95: 'Thunderstorm',
//       96: 'Thunderstorm',
//       99: 'Thunderstorm',
//     };
//     return codes[code] || 'Unknown';
//   };

//   const weatherCodeToDescription = (code: number): string => {
//     return weatherCodeToCondition(code);
//   };

//   const firstData = processedData[0];

//   const uniqueDates = [
//     ...new Set(
//       processedData.map(
//         (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
//       )
//     )
//   ];

//   const firstDataForEachDate = uniqueDates.map((date) => {
//     return processedData.find((entry) => {
//       const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
//       const entryTime = new Date(entry.dt * 1000).getHours();
//       return entryDate === date && entryTime >= 6;
//     });
//   }).slice(1);

//   if (isLoading || isGeocodingLoading)
//     return (
//       <div className="flex items-center min-h-screen justify-center">
//         <p className="animate-bounce">Loading...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex items-center min-h-screen justify-center">
//         <p className="text-red-400">Failed to fetch weather data</p>
//       </div>
//     );

//   return (
//     <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
//       <Navbar location={place} />
//       <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
//         {loadingCity ? (
//           <WeatherSkeleton />
//         ) : (
//           <>
//             <section className="space-y-4">
//               <div className="space-y-2">
//                 <h2 className="flex gap-1 text-2xl items-end">
//                   <p>{firstData?.dt_txt ? format(new Date(firstData.dt_txt), "EEEE") : ""}</p>
//                   <p className="text-lg">
//                     {firstData?.dt_txt ? `(${format(new Date(firstData.dt_txt), "dd.MM.yyyy")})` : ""}
//                   </p>
//                 </h2>
//                 <Container className="gap-10 px-6 items-center">
//                   <div className="flex flex-col px-4">
//                     <span className="text-5xl">
//                       {firstData?.main.temp ?? 0}°
//                     </span>
//                     <p className="text-xs space-x-1 whitespace-nowrap">
//                       <span>Feels like</span>
//                       <span>{firstData?.main.feels_like ?? 0}°</span>
//                     </p>
//                     <p className="text-xs space-x-2">
//                       <span>{firstData?.main.temp_min ?? 0}°↓</span>
//                       <span>{firstData?.main.temp_max ?? 0}°↑</span>
//                     </p>
//                   </div>
//                   <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
//                     {processedData.slice(0, 24).map((d, i) => (
//                       <div
//                         key={i}
//                         className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
//                       >
//                         <p className="whitespace-nowrap">
//                           {format(new Date(d.dt_txt), "h:mm a")}
//                         </p>
//                         <WeatherIcon iconName={d.weather[0].icon} />
//                         <p>{d.main.temp}°</p>
//                       </div>
//                     ))}
//                   </div>
//                 </Container>
//               </div>
//               <div className="flex gap-4">
//                 <Container className="w-fit justify-center flex-col px-4 items-center">
//                   <p className="capitalize text-center">
//                     {firstData?.weather[0].description}
//                   </p>
//                   <WeatherIcon iconName={firstData?.weather[0].icon ?? ""} />
//                 </Container>
//                 <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
//                   <WeatherDetails
//                     visability={metersToKilometers(firstData?.visibility ?? 10000)}
//                     airPressure={`${firstData?.main.pressure} hPa`}
//                     humidity={`${firstData?.main.humidity}%`}
//                     sunrise={data?.daily.sunrise[0] ? format(new Date(data.daily.sunrise[0]), "H:mm") : "N/A"}
//                     sunset={data?.daily.sunset[0] ? format(new Date(data.daily.sunset[0]), "H:mm") : "N/A"}
//                     windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
//                   />
//                 </Container>
//               </div>
//             </section>

//             <section className="flex w-full flex-col gap-4">
//               <p className="text-2xl">Forecast (7 days)</p>
//               {firstDataForEachDate.map((d, i) => (
//                 <ForecastWeatherDetail
//                   key={i}
//                   description={d?.weather[0].description ?? ""}
//                   weatherIcon={d?.weather[0].icon ?? "01d"}
//                   date={d ? format(new Date(d.dt_txt), "dd.MM") : ""}
//                   day={d ? format(new Date(d.dt_txt), "EEEE") : ""}
//                   feels_like={d?.main.feels_like ?? 0}
//                   temp={d?.main.temp ?? 0}
//                   temp_max={d?.main.temp_max ?? 0}
//                   temp_min={d?.main.temp_min ?? 0}
//                   airPressure={`${d?.main.pressure} hPa`}
//                   humidity={`${d?.main.humidity}%`}
//                   sunrise={data?.daily.sunrise[i] ? format(new Date(data.daily.sunrise[i]), "H:mm") : "N/A"}
//                   sunset={data?.daily.sunset[i] ? format(new Date(data.daily.sunset[i]), "H:mm") : "N/A"}
//                   visability={`${metersToKilometers(d?.visibility ?? 10000)}`}
//                   windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)}`}
//                 />
//               ))}
//             </section>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

// function WeatherSkeleton() {
//   return (
//     <section className="space-y-8">
//       <div className="space-y-2 animate-pulse">
//         <div className="flex gap-1 text-2xl items-end">
//           <div className="h-6 w-24 bg-gray-300 rounded"></div>
//           <div className="h-6 w-24 bg-gray-300 rounded"></div>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[1, 2, 3, 4].map((index) => (
//             <div key={index} className="flex flex-col items-center space-y-2">
//               <div className="h-6 w-16 bg-gray-300 rounded"></div>
//               <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
//               <div className="h-6 w-16 bg-gray-300 rounded"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex flex-col gap-4 animate-pulse">
//         <p className="text-2xl h-8 w-36 bg-gray-300 rounded"></p>
//         {[1, 2, 3, 4, 5, 6, 7].map((index) => (
//           <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="h-8 w-28 bg-gray-300 rounded"></div>
//             <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
//             <div className="h-8 w-28 bg-gray-300 rounded"></div>
//             <div className="h-8 w-28 bg-gray-300 rounded"></div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }







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
import { useEffect, useState } from "react";
import { log } from "console";

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
  const [place, setPlace] = useAtom(placeAtom);
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