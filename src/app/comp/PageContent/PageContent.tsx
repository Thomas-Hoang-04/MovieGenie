import Image from "next/image";
import motionBackDrop from "@/app/assets/images/motion-backdrop.jpg";
import motionPldImg from "@/app/assets/images/motion-pld-img.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { GeneralDetails, MotionDetails, ImageBlurData } from "@/lib/types";
import {
  releaseDate,
  imgSrc,
  runtime,
  movieCheck,
  statusVariant,
  TVStatusDisplay,
} from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

const HiddenContent = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={title.toLowerCase()}
        title={title.toLowerCase()}
        className="border-none">
        <AccordionTrigger className="hover:no-underline font-semibold text-2xl pb-3">
          {title}
        </AccordionTrigger>
        <AccordionContent className="text-base font-medium border-t border-teal-700 dark:border-slate-200 pt-3">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const DetailContent = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <hgroup className="flex italic">
      <h2 className="font-semibold">{title}: &nbsp;</h2>
      <p className="font-medium">{children}</p>
    </hgroup>
  );
};

export function MotionContent({ main }: { main: MotionDetails }) {
  const isMovie = movieCheck(main);

  return (
    <>
      <article className="flex justify-center max-xl:-mx-6 mb-4">
        <Image
          src={imgSrc(main.backdrop_path, motionBackDrop)}
          alt={main.title}
          width={1440}
          height={900}
          placeholder={ImageBlurData}
          className="dark:opacity-75 relative"
        />
      </article>
      <article className="poster">
        <Image
          src={imgSrc(main.poster_path, motionPldImg)}
          alt={main.title}
          width={200}
          height={300}
          placeholder={ImageBlurData}
          className="rounded-lg mx-auto"
        />
      </article>
      <section className="content">
        <h1 className="text-2xl font-bold italic">{main.title}</h1>
        <div className="flex gap-2 items-center mt-1">
          <p className="text-lg font-medium italic">
            {releaseDate(main.release_date)}
          </p>
          <Badge
            variant={statusVariant(main.status)}
            className="text-sm font-bold border-none rounded-full tracking-[0.0125rem] px-3">
            {isMovie && (main.status === "Planned" ? "Rumored" : main.status)}
            {!isMovie && TVStatusDisplay(main.status)}
          </Badge>
        </div>
        <section className="flex gap-2 mt-4 mb-1 flex-wrap">
          {main.genres.map((genre: GeneralDetails) => (
            <Badge key={genre.id} className="badge">
              {genre.name}
            </Badge>
          ))}
        </section>
        <section className="mt-4">
          {isMovie && main.runtime > 0 && (
            <DetailContent title="Runtime">
              {runtime(main.runtime)}
            </DetailContent>
          )}
        </section>
        {main.tagline?.length > 0 && (
          <blockquote className="quote">
            <FontAwesomeIcon icon={faQuoteLeft} className="mr-2" />
            {main.tagline}
            <FontAwesomeIcon icon={faQuoteRight} className="ml-2" />
          </blockquote>
        )}
        <HiddenContent title="Overview">{main.overview}</HiddenContent>
      </section>
    </>
  );
}
