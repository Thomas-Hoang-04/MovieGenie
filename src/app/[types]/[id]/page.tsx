import { Category, Details } from "@/lib/types";
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
import PageContent from "@/app/comp/PageContent/PageContent";
import { Badge } from "@/components/ui/badge";

export default async function Page({
  params,
}: {
  params: { types: Category; id: string };
}) {
  const data = await getPageData(params.types, params.id);
  const main = extractData(data.metadata, params.types);

  return (
    <>
      <Button className="back" asChild>
        <Link href={`/${params.types}`} className="relative top-8 z-10 w-max">
          <FontAwesomeIcon icon={faArrowLeft} />
          <p className="hidden md:inline">Back</p>
        </Link>
      </Button>
      <Separator className="seperator-id" />
      <article className="flex justify-center max-xl:-mx-6 mb-4">
        <Image
          src={imgSrc(main.backdrop_path, motionBackDrop)}
          alt={main.title}
          width={1440}
          height={900}
          placeholder={ImageBlurData}
          className="dark:opacity-85 relative"
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
          <p className="mt-1 text-lg font-medium italic">
            {releaseDate(main.release_date)}
          </p>
          <section className="flex gap-2 mt-3 mb-1">
            {main.genres.map((genre: Details) => (
              <Badge key={genre.id} className="badge">
                {genre.name}
              </Badge>
            ))}
          </section>
          <PageContent title="Overview" content={main.overview} />
        </section>
      </article>
    </>
  );
}
