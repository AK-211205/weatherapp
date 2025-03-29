import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

type WeatherIconProps = React.HTMLProps<HTMLDivElement> & {
  iconName: string;
};

export default function WeatherIcon({ iconName, className, ...rest }: WeatherIconProps) {
  return (
    <div title={iconName} className={cn("relative h-20 w-20", className)} {...rest}>
      <Image
        width={100}
        height={100}
        alt="weather-icon"
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
      />
    </div>
  );
}
