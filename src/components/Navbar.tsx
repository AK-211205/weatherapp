

/** @format */
"use client";

import React, { useState } from "react";
import { MdOutlineLocationOn, MdWbSunny, MdMyLocation } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom, coordinatesAtom } from "@/app/atom";


type Props = { location?: string };

export default function Navbar({ location }: Props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<{name: string, latitude: number, longitude: number}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);
  const [coordinates, setCoordinates] = useAtom(coordinatesAtom);

  async function handleInputChange(value: string) {
    setCity(value);
    console.log(city)
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5`
        );

        if (response.data.results) {
          setSuggestions(response.data.results);
          setError("");
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(value: {name: string, latitude: number, longitude: number}) {
    setCity(value.name);
    setPlace(value.name);
    console.log(city)
    setCoordinates({ latitude: value.latitude, longitude: value.longitude });
    setShowSuggestions(false);
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);

    e.preventDefault();
    if (suggestions.length === 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }

  
  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Raw coords:", latitude, longitude); // Correct values here
        
        setLoadingCity(true);
        
        // Create new object to force state change
        const newCoords = { 
          latitude: Number(latitude.toFixed(6)), // Preserve precision
          longitude: Number(longitude.toFixed(6)) 
        };
        
        setCoordinates(newCoords);
        console.log("Updated coords:", newCoords); // Verify correct values
        
        setLoadingCity(false);
        
      }, (error) => {
        setLoadingCity(false);
        console.error("Geolocation error:", error);
      });
    }
  }

  return (
    <>
      <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-gray-500 text-3xl">Weather</h2>
            <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
          </div>
          {/*  */}
          <section className="flex gap-2 items-center">
            <MdMyLocation
              title="Your Current Location"
              onClick={handleCurrentLocation}
              className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
            />
            <MdOutlineLocationOn className="text-3xl" />
            <p className="text-slate-900/80 text-sm">{location}</p>
            <div className="relative hidden md:flex">
              {/* SearchBox */}
              <SearchBox
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <SuggestionBox
                {...{
                  showSuggestions,
                  suggestions,
                  handleSuggestionClick,
                  error
                }}
              />
            </div>
          </section>
        </div>
      </nav>
      <section className="flex max-w-7xl px-3 md:hidden">
        <div className="relative">
          {/* SearchBox */}
          <SearchBox
            value={city}
            onSubmit={handleSubmitSearch}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <SuggestionBox
            {...{
              showSuggestions,
              suggestions,
              handleSuggestionClick,
              error
            }}
          />
        </div>
      </section>
    </>
  );
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error
}: {
  showSuggestions: boolean;
  suggestions: {name: string, latitude: number, longitude: number}[];
  handleSuggestionClick: (item: {name: string, latitude: number, longitude: number}) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 0) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1">{error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}