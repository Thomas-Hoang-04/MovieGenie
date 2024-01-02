import { Category } from "@/lib/types";
import Link from "next/link";
import "./page.scss";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import motionBackDrop from "@/app/assets/images/motion-backdrop.jpg";
import motionPldImg from "@/app/assets/images/motion-pld-img.png";
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
        <Button className="back">
          <FontAwesomeIcon icon={faArrowLeft} />

          <p className="hidden md:inline">Back</p>
        </Button>
      </Link>
      <Separator className="seperator" />
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
      <article className="info">
        <Image
          src={imgSrc(main.poster_path, motionPldImg)}
          alt={main.title}
          width={200}
          height={300}
          placeholder={ImageBlurData}
          className="rounded-lg hidden lg:block"
        />
        <section className="content">
          <h1 className="text-2xl font-bold italic">{main.title}</h1>
          <p className="mt-1 text-lg font-medium">
            {releaseDate(main.release_date)}
          </p>
          <h2 className="text-base font-normal mt-3">{main.overview}</h2>
        </section>
      </article>
    </>
  );
}
