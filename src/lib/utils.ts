import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { Category, Details } from "./types";
import { StaticImageData } from "next/image";
import org_countries from "./countries.json";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getSearchData = async ({
  queryKey,
  pageParam,
}: {
  queryKey: string[];
  pageParam: number;
}) => {
  const [_key, query, type] = queryKey as [string, Category, string];
  const res = await axios.request({
    method: "GET",
    url: `/api/search`,
    params: {
      type: type,
      query: query,
      page: pageParam,
    },
  });
  return res.data;
};

const getCreditData = async (type: Category, id: string) => {
  const credit = type == "movie" ? "credits" : "aggregate_credits";
  const res = await axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/${type}/${id}/${credit}`,
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.AUTH_KEY}`,
    },
  });
  return res.data;
};

export const getPageData = async (type: Category, id: string) => {
  const res = await axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/${type}/${id}`,
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.AUTH_KEY}`,
    },
  });
  if (type == "person") {
    return { metadata: { ...res.data } };
  }
  const credit = await getCreditData(type, id);
  return { metadata: { ...res.data }, credit: { ...credit } };
};

export const extractData = (data: any, type: Category) => {
  switch (type) {
    case "movie":
      return {
        title: data.title,
        backdrop_path: data.backdrop_path,
        release_date: data.release_date,
        poster_path: data.poster_path,
        overview: data.overview,
        genres: data.genres,
        tagline: data.tagline,
        runtime: data.runtime,
      };
    case "tv":
      return data;
    case "person":
      return data;
    default:
      return data;
  }
};

export const imgSrc = (path: string, pldImg: StaticImageData) => {
  return path?.length > 0
    ? `https://image.tmdb.org/t/p/original${path}`
    : pldImg;
};

export const releaseDate = (date: string) => {
  return date?.length > 0 ? date.split("-")[0] : "";
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
