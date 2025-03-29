
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