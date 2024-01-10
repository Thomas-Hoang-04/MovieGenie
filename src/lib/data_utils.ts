import axios from "axios";
import { Category, CreditDetails, Details } from "./types";

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

export const extractData = (data: any, type: Category): Details => {
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
        status: data.status,
        production_companies: data.production_companies,
      };
    case "tv":
      return {
        title: data.name,
        backdrop_path: data.backdrop_path,
        release_date: data.first_air_date,
        poster_path: data.poster_path,
        overview: data.overview,
        genres: data.genres,
        tagline: data.tagline,
        status: data.status,
        production_companies: data.production_companies,
      };
    case "person":
      return data;
    default:
      return data;
  }
};

export const extractCreditData = (
  data: any,
  type: Exclude<Category, "person">
): CreditDetails => {
  switch (type) {
    case "movie":
      return {
        cast: data.cast
          .filter((cast: any) => cast.order < 20)
          .map((cast: any) => {
            return {
              id: cast.id,
              name: cast.name,
              character: cast.character,
              profile_path: cast.profile_path,
            };
          }),
        crew: data.crew
          .filter(
            (crew: any) => crew.job === "Director" || crew.job === "Screenplay"
          )
          .map((crew: any) => {
            return {
              id: crew.id,
              name: crew.name,
              job: crew.job,
              profile_path: crew.profile_path,
            };
          }),
      };
    case "tv":
      return {
        cast: data.cast,
        crew: data.crew,
      };
    default:
      return data;
  }
};
