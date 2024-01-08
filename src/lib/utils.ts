import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Details, GeneralDetails, MotionDetails, MovieDetails } from "./types";
import { StaticImageData } from "next/image";
import org_countries from "./countries.json";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const imgSrc = (path: string, pldImg: StaticImageData) => {
  return path?.length > 0
    ? `https://image.tmdb.org/t/p/original${path}`
    : pldImg;
};

export const releaseDate = (date: string) => {
  return date?.length > 0 ? date.split("-")[0] : "";
};

export const runtime = (time: number) => {
  return time && time > 0
    ? time < 60
      ? `${time % 60} ${time === 1 ? "minute" : "minutes"}`
      : time % 60 === 0
      ? `${time / 60} ${time / 60 === 1 ? "hour" : "hours"}`
      : `${Math.floor(time / 60)} hours ${time % 60} ${
          time % 60 === 1 ? "minute" : "minutes"
        }`
    : undefined;
};

export const studios = (production_companies: GeneralDetails[]) => {
  return production_companies?.length > 0
    ? production_companies
        .map((company: GeneralDetails) => company.name)
        .join(", ")
    : undefined;
};

export const countries = org_countries.map(country => {
  if (country.name.includes(",")) {
    switch (country.code) {
      case "KR":
        return {
          name: `South ${country.name.slice(0, country.name.indexOf(","))}`,
          code: country.code,
        };
      case "KP":
        return {
          name: `North ${country.name.slice(0, country.name.indexOf(","))}`,
          code: country.code,
        };
      default:
        return {
          name: `${country.name.slice(0, country.name.indexOf(","))}`,
          code: country.code,
        };
    }
  } else {
    if (country.code === "RU") {
      return { name: "Russia", code: country.code };
    } else return country;
  }
});

export const motionCheck = (data: Details): data is MotionDetails => {
  return (data as MotionDetails).poster_path !== undefined;
};

export const movieCheck = (data: MotionDetails): data is MovieDetails => {
  return (data as MovieDetails).runtime !== undefined;
};

export const statusVariant = (status: string) => {
  switch (status) {
    case "Released":
    case "Returning Series":
      return "released";
    case "Planned":
    case "Ended":
      return "rumored";
    case "In Production":
    case "Post Production":
      return "upcoming";
    case "Canceled":
      return "canceled";
    default:
      return "default";
  }
};

export const TVStatusDisplay = (status: string) => {
  switch (status) {
    case "Returning Series":
      return "Ongoing";
    case "In Production":
      return "Upcoming";
    default:
      return status;
  }
};
