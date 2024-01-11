import Axios from "axios";
import { Category, CreditDetails, Details } from "./types";
import { setupCache } from "axios-cache-interceptor";

const axios = setupCache(Axios);

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
  const motionBase = {
    title: type == "movie" ? data.title : data.name,
    backdrop_path: data.backdrop_path,
    release_date: type == "movie" ? data.release_date : data.first_air_date,
    poster_path: data.poster_path,
    overview: data.overview,
    genres: data.genres,
    tagline: data.tagline,
    status: data.status,
    production_companies: data.production_companies,
  };
  switch (type) {
    case "movie":
      return {
        ...motionBase,
        runtime: data.runtime,
      };
    case "tv":
      return {
        ...motionBase,
        created_by: data.created_by,
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
  return {
    cast: data.cast
      ?.filter((cast: any, i: number) =>
        type == "movie" ? cast.order < 16 : i < 16
      )
      .map((cast: any) => {
        const base = {
          id: cast.id,
          name: cast.name,
          profile_path: cast.profile_path,
          gender: cast.gender,
        };
        return type == "tv"
          ? {
              ...base,
              roles: cast.roles.map((role: any) => {
                return {
                  character: role.character,
                  episode_count: role.episode_count,
                };
              }),
            }
          : { ...base, character: cast.character };
      }),
    crew:
      type == "movie"
        ? data.crew
            ?.filter(
              (crew: any) =>
                crew.job === "Director" || crew.job === "Screenplay"
            )
            .map((crew: any) => {
              return {
                id: crew.id,
                name: crew.name,
                job: crew.job,
                profile_path: crew.profile_path,
                gender: crew.gender,
              };
            })
        : undefined,
  };
};
