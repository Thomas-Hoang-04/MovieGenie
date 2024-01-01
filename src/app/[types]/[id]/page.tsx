import { Category } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import motionBackDrop from "@/app/assets/images/motion-backdrop.jpg";
import Image from "next/image";
import { ImageBlurData } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { extractData, getPageData, imgSrc, releaseDate } from "@/lib/utils";

export default async function Page({
  params,
}: {
  params: { types: Category; id: string };
}) {
  const data = await getPageData(params.types, params.id);
  const main = extractData(data.metadata, params.types);

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
          src={imgSrc(main.backdrop_path, motionBackDrop)}
          alt={main.title}
          width={1440}
          height={900}
          placeholder={ImageBlurData}
          className="opacity-65 relative"
        />
      </article>
      <article className="relative -top-[4.25rem] py-4 bg-teal-700 bg-opacity-85 px-10 rounded-xl">
        <h1 className="text-2xl font-bold italic">{main.title}</h1>
        <p>{releaseDate(main.release_date)}</p>
      </article>
    </>
  );
}
