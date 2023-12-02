"use client";

import { Category, TypeText } from "@/lib/types";
import Card from "../comp/Card/Card";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchBox from "../comp/SearchBox/SearchBox";

const getData = async ({
  queryKey,
  pageParam,
}: {
  queryKey: string[];
  pageParam: number;
}) => {
  const [_key, query, type] = queryKey as [string, Category, string];
  const res = await axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/search/${type}`,
    params: {
      query: query,
      include_adult: false,
      language: "en-US",
      page: pageParam,
    },
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.NEXT_PUBLIC_AUTH_KEY}`,
    },
  });
  return res.data;
};

export default function Page({
  params,
}: {
  params: { types: Category };
}): React.ReactElement {
  const [query, setQuery] = useState<string>("");

  const { data, isLoading, isSuccess, isError } = useInfiniteQuery({
    queryKey: ["search", query, params.types],
    queryFn: ({ queryKey, pageParam = 1 }) => getData({ queryKey, pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.total_pages && lastPage.page + 1,
    enabled: query.length != 0,
  });

  return (
    <main>
      <SearchBox type={TypeText(params.types)} setQuery={setQuery} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong...</p>}
      {isSuccess &&
        data.pages.map((page, index) => {
          return (
            <section key={index}>
              {page.results.map((result: any) => {
                const title = result.title || result.name;
                const release_time =
                  result.release_date?.split("-")[0] ||
                  result.first_air_date?.split("-")[0] ||
                  "";
                return (
                  <Card
                    key={result.id}
                    id={result.id}
                    title={title}
                    poster_path={result.poster_path}
                    release_date={release_time}
                    type={params.types}
                  />
                );
              })}
            </section>
          );
        })}
    </main>
  );
}
