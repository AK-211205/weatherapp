
/** @format */
import { atom } from "jotai";

export const placeAtom = atom("India");
export const coordinatesAtom = atom({ latitude: 0, longitude: 0 });
export const loadingCityAtom = atom(false);