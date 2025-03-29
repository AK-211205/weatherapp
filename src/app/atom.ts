// /** @format */

// import { atom } from "jotai";

// export const placeAtom = atom("Republic of India");

// export const loadingCityAtom = atom(false);

/** @format */
import { atom } from "jotai";

export const placeAtom = atom("Republic of India");
export const coordinatesAtom = atom({ latitude: 0, longitude: 0 });
export const loadingCityAtom = atom(false);