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
  return res.data;
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
      <Link href={`/${params.types}`}>
        <Button className="flex items-center dark:text-teal-700 font-semibold text-base rounded-full">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Go Back
        </Button>
      </Link>
      <Separator className="bg-teal-700 dark:bg-teal-600 rounded-full mt-6 h-1 w-screen -mx-6" />
      <article className="flex justify-center -mx-6 mb-4">
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
