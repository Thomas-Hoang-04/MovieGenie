"use client";

import { Category } from "@/lib/types";
import dynamic from "next/dynamic";
import { getData } from "@/lib/getData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SearchBox from "../comp/SearchBox/SearchBox";
import { Button } from "@/components/ui/button";
import { Loader, ProgressLoader } from "../comp/Loader/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "@/components/ui/separator";

const Card = dynamic(() => import("@/app/comp/Card/Card"), {
  loading: () => <Loader />,
});

export default function Page({
  params,
}: {
  params: { types: Category };
}): React.ReactElement {
  const [query, setQuery] = useState<string>("");

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
    queryFn: ({ queryKey, pageParam = 1 }) => getData({ queryKey, pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.curr_page < lastPage.total_pages
        ? lastPage.curr_page + 1
        : undefined,

    enabled: query.length != 0,
  });

  useEffect(() => {}, []);

  return (
    <>
      <SearchBox type={params.types} setQuery={setQuery} />
      <article>
        {isSuccess && (
          <>
            <Separator className="bg-teal-700 dark:bg-teal-600 rounded-full mx-auto mt-6 h-1" />
            <h1 className="my-4 font-bold italic text-teal-800 dark:text-slate-200 text-xl">
              {data.pages[0].no_result ? (
                <>
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  {`No result found for "${query}"`}
                </>
              ) : (
                `Search results for "${query}"`
              )}
            </h1>
            {data.pages.map((page, index) => {
              return (
                <section key={index}>
                  {page.data.map((result: any) => {
                    return (
                      <Card
                        key={result.id}
                        {...result}
                        type={params.types}
                        query={query}
                      />
                    );
                  })}
                </section>
              );
            })}
          </>
        )}
        {(isLoading || isFetchingNextPage) && (
          <ProgressLoader
            children={
              <p className="font-bold text-[1.25rem] italic">
                Loading Results...
              </p>
            }
          />
        )}
        {isError && <p>Something went wrong...</p>}
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>Next Page</Button>
        )}
      </article>
    </>
  );
}
