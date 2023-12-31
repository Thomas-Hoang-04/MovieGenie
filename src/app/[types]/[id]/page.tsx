import { Category } from "@/lib/types";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import motionBackDrop from "@/app/assets/images/motion-backdrop.jpg";
import { ImageBlurData } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

async function getData(types: Category, id: string) {
  const res = await axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/${types}/${id}`,
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.AUTH_KEY}`,
    },
  });
  switch (types) {
    case "movie":
      return {
        title: res.data.title,
        backdrop_path: res.data.backdrop_path,
        release_date: res.data.release_date,
        poster_path: res.data.poster_path,
        overview: res.data.overview,
        genres: res.data.genres,
        tagline: res.data.tagline,
        runtime: res.data.runtime,
      };
    case "tv":
      return res.data;
    case "person":
      return res.data;
    default:
      return res.data;
  }
}

const imgSrc = (path: string) => {
  return path?.length > 0
    ? `https://image.tmdb.org/t/p/original${path}`
    : motionBackDrop;
};

const releaseDate = (date: string) => {
  return date?.length > 0 ? date.split("-")[0] : "";
};

export default async function Page({
  params,
}: {
  params: { types: Category; id: string };
}) {
  const data = await getData(params.types, params.id);

  return (
    <>
      <Link href={`/${params.types}`} className="relative top-8 z-10 w-max">
        <Button className="flex items-center gap-2 w-10 md:w-auto dark:text-teal-700 font-semibold text-base rounded-full dark:bg-slate-200">
          <FontAwesomeIcon icon={faArrowLeft} />

          <p className="hidden md:inline">Back</p>
        </Button>
      </Link>
      <Separator className="bg-teal-700 dark:bg-teal-600 rounded-full -mt-6 h-1 w-screen xl:w-full max-w-[1440px] max-xl:-mx-6" />
      <article className="flex justify-center max-xl:-mx-6 mb-4">
        <Image
          src={imgSrc(data.backdrop_path)}
          alt={data.title}
          width={1440}
          height={900}
          placeholder={ImageBlurData}
          className="opacity-65 relative"
        />
      </article>
      <article className="relative -top-[4.25rem] py-4 bg-teal-700 bg-opacity-85 px-10 rounded-xl">
        <h1 className="text-2xl font-bold italic">{data.title}</h1>
        <p>{releaseDate(data.release_date)}</p>
      </article>
    </>
  );
}
