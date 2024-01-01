"use client";

import { Category } from "@/lib/types";
import dynamic from "next/dynamic";
import { getSearchData } from "@/lib/utils";
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
            <Separator className="bg-teal-700 dark:bg-teal-600 rounded-full mx-auto mt-6 h-1" />
            <h1 className="my-4 font-bold italic text-teal-800 dark:text-slate-200 text-xl phone-l:text-2xl sm:text-3xl laptop:text-4xl laptop:mt-8 md:my-6">
              {data.pages[0].no_result ? (
                <>
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  {`No result found for "${query}"`}
                </>
              ) : (
                `Search results for "${query}"`
              )}
            </h1>
            <section className="sm:grid sm:grid-cols-2 gap-x-4 min-[800px]:grid-cols-3 min-[1200px]:grid-cols-4">
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
            <p className="font-bold text-xl italic md:text-2xl md:ml-2 md:my-4 laptop:text-3xl laptop:my-6">
              Loading Results...
            </p>
          </ProgressLoader>
        )}
        {isError && <ErrorDisplay />}
        {!isLoading && !isFetchingNextPage && hasNextPage && (
          <Button
            className="text-lg px-6 py-6 font-semibold mb-4 bg-teal-600 dark:bg-teal-700 dark:text-slate-200 dark:hover:bg-teal-600 hover:bg-teal-500 rounded-full md:text-xl md:p-7 lg:p-8 lg:text-2xl lg:mb-8 lg:mt-4"
            onClick={() => fetchNextPage()}>
            Load More
            <FontAwesomeIcon icon={faForward} className="ml-3" />
          </Button>
        )}
      </article>
    </>
  );
}
