// import React from "react";
// import Image from "next/image";
// import { cn } from "@/utils/cn";

// type WeatherIconProps = React.HTMLProps<HTMLDivElement> & {
//   iconName: string;
// };

// export default function WeatherIcon({ iconName, className, ...rest }: WeatherIconProps) {
//   return (
//     <div title={iconName} className={cn("relative h-20 w-20", className)} {...rest}>
//       <Image
//         width={100}
//         height={100}
//         alt="weather-icon"
//         className="absolute h-full w-full"
//         src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
//       />
//     </div>
//   );
// }


// import React from "react";
// import Image from "next/image";
// import { cn } from "@/utils/cn";

// type WeatherIconProps = React.HTMLProps<HTMLDivElement> & {
//   iconName: string;
// };

// // Map Open-Meteo weather codes to local icon paths
// const WEATHER_ICON_MAP: Record<string, string> = {
//   'clear-day': '/weather-icons/clear-day.png',
//   'clear-night': '/weather-icons/clear-night.png',
//   'partly-cloudy-day': '/weather-icons/partly-cloudy-day.png',
//   'partly-cloudy-night': '/weather-icons/partly-cloudy-night.png',
//   'cloudy': '/weather-icons/cloudy.png',
//   'overcast': '/weather-icons/overcast.png',
//   'fog': '/weather-icons/fog.png',
//   'drizzle': '/weather-icons/drizzle.png',
//   'rain': '/weather-icons/rain.png',
//   'sleet': '/weather-icons/sleet.png',
//   'snow': '/weather-icons/snow.png',
//   'thunderstorm': '/weather-icons/thunderstorm.png',
//   // Default fallback icon
//   'default': '/weather-icons/not-available.png'
// };

// export default function WeatherIcon({ iconName, className, ...rest }: WeatherIconProps) {
//   // Get the appropriate icon path or use default
//   const iconPath = WEATHER_ICON_MAP[iconName] || WEATHER_ICON_MAP['default'];

//   return (
//     <div title={iconName} className={cn("relative h-20 w-20", className)} {...rest}>
//       <Image
//         width={100}
//         height={100}
//         alt={`${iconName} weather icon`}
//         className="absolute h-full w-full"
//         src={iconPath}
//         onError={(e) => {
//           // Fallback to default icon if the specified one fails to load
//           const target = e.target as HTMLImageElement;
//           target.src = WEATHER_ICON_MAP['default'];
//         }}
//       />
//     </div>
//   );
// }
import React from "react";
import { 
  WiDaySunny, WiNightClear, 
  WiDayCloudy, WiNightCloudy,
  WiCloud, WiCloudy,
  WiFog, WiRain, 
  WiSnow, WiSleet,
  WiThunderstorm, WiNa
} from "react-icons/wi";
import { cn } from "@/utils/cn";

type WeatherIconProps = React.HTMLProps<HTMLDivElement> & {
  iconName: string;
  size?: number;
};
interface WeatherIconComponentProps extends React.SVGAttributes<SVGElement> {
  size?: number | string;
  title?: string;
}


const iconComponents: Record<string, React.ComponentType<WeatherIconComponentProps>> = {
  'clear-day': WiDaySunny,
  'clear-night': WiNightClear,
  'partly-cloudy-day': WiDayCloudy,
  'partly-cloudy-night': WiNightCloudy,
  'cloudy': WiCloud,
  'overcast': WiCloudy,
  'fog': WiFog,
  'drizzle': WiRain,
  'rain': WiRain,
  'sleet': WiSleet,
  'snow': WiSnow,
  'thunderstorm': WiThunderstorm,
  'default': WiNa
};

export default function WeatherIcon({ 
  iconName, 
  className, 
  size=60,
  ...rest 
}: WeatherIconProps) {
  const IconComponent = iconComponents[iconName] || iconComponents['default'];
  
  return (
    <div className={cn("flex items-center justify-center", className)} {...rest}>
      <IconComponent size={size}/>
    </div>
  );
}