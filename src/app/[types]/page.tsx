"use client";

import { Category } from "@/lib/types";
import dynamic from "next/dynamic";
import "./page.scss";
import { getSearchData } from "@/lib/data_utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLayoutEffect, useState, useRef } from "react";
import SearchBox from "../comp/SearchBox/SearchBox";
import { Button } from "@/components/ui/button";
import { ErrorDisplay, Loader, ProgressLoader } from "../comp/Loader/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";

const MotionCard = dynamic(
  () => import("@/app/comp/Card/Card").then(mod => mod.MotionCard),
  {
    loading: () => <Loader />,
  }
);

const PersonCard = dynamic(
  () => import("@/app/comp/Card/Card").then(mod => mod.PersonCard),
  {
    loading: () => <Loader />,
  }
);

export default function Page({
  params,
}: {
  params: { types: Category };
}): React.ReactElement {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", query, params.types],
    queryFn: ({ queryKey, pageParam = 1 }) =>
      getSearchData({ queryKey, pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.curr_page < lastPage.total_pages
        ? lastPage.curr_page + 1
        : undefined,

    enabled: query.length != 0,
  });

  useLayoutEffect(() => {
    const type_cache = sessionStorage.getItem("type");
    const query_cache = sessionStorage.getItem("query");

    if (type_cache === params.types && query_cache) {
      sessionStorage.removeItem("type");
      sessionStorage.removeItem("query");
      setQuery(query_cache);
      setTimeout(() => {
        inputRef.current!.value = query_cache;
        router.push("/" + params.types + "?q=" + query_cache);
      }, 10);
    } else if (searchParams.get("q")) {
      setQuery(searchParams.get("q") as string);
      setTimeout(() => {
        inputRef.current!.value = searchParams.get("q") as string;
        router.push("/" + params.types + "?q=" + searchParams.get("q"));
      }, 10);
    }
  }, [params.types, setQuery, router, searchParams]);

  return (
    <>
      <SearchBox type={params.types} setQuery={setQuery} ref={inputRef} />
      <article>
        {isSuccess && (
          <>
            <Separator className="seperator" />
            <h1 className="result-title">
              {data.pages[0].no_result ? (
                <>
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  {`No result found for "${query}"`}
                </>
              ) : (
                `Search results for "${query}"`
              )}
            </h1>
            <section className="layout">
              {data?.pages
                .flatMap(page => page.data)
                .map(result => {
                  switch (params.types) {
                    case "movie":
                    case "tv":
                      return (
                        <MotionCard
                          key={result.id}
                          {...result}
                          type={params.types}
                          query={query}
                        />
                      );
                    case "person":
                      return (
                        <PersonCard
                          key={result.id}
                          {...result}
                          type={params.types}
                          query={query}
                        />
                      );
                  }
                })}
            </section>
          </>
        )}
        {(isLoading || isFetchingNextPage) && (
          <ProgressLoader>
            <p className="data-loader">Loading Results...</p>
          </ProgressLoader>
        )}
        {isError && <ErrorDisplay />}
        {!isLoading && !isFetchingNextPage && hasNextPage && (
          <Button className="load-more" onClick={() => fetchNextPage()}>
            Load More
            <FontAwesomeIcon icon={faForward} className="ml-3" />
          </Button>
        )}
      </article>
    </>
  );
}
