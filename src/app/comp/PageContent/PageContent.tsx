import Image from "next/image";
import motionBackDrop from "@/app/assets/images/motion-backdrop.jpg";
import motionPldImg from "@/app/assets/images/motion-pld-img.png";
import personMalePld from "@/app/assets/images/person-male-pld.webp";
import personFemalePld from "@/app/assets/images/person-female-pld.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  GeneralDetails,
  MotionDetails,
  ImageBlurData,
  CreditDetails,
  TVSeriesCreator,
} from "@/lib/types";
import {
  releaseDate,
  imgSrc,
  runtime,
  movieCheck,
  statusVariant,
  TVStatusDisplay,
  studios,
  character,
  cn,
} from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { extractCreditData } from "@/lib/data_utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const HiddenContent = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <AccordionItem
      value={title.toLowerCase()}
      title={title.toLowerCase()}
      className="border-none">
      <AccordionTrigger className="hover:no-underline font-bold dark:font-semibold text-2xl pb-3">
        {title}
      </AccordionTrigger>
      <AccordionContent className="text-base font-medium border-t border-teal-700 dark:border-slate-200 pt-3">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};

const DetailContent = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <hgroup className="flex italic flex-wrap mb-1">
      <h2 className="font-bold w-max">
        {title}: &nbsp;
        <p className="font-medium inline">{children}</p>
      </h2>
    </hgroup>
  );
};

export function MotionContent({
  main,
  raw_credit,
}: {
  main: MotionDetails;
  raw_credit: CreditDetails;
}) {
  const isMovie = movieCheck(main);
  const credit = extractCreditData(raw_credit, isMovie ? "movie" : "tv");

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
        <h1 className="text-[1.75rem] leading-snug font-bold italic">
          {main.title}
        </h1>
        <div className="flex gap-2 items-center mt-1">
          {main.release_date.length > 0 && (
            <p className="text-lg font-medium italic">
              {releaseDate(main.release_date)}
            </p>
          )}
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
          {main.production_companies?.length > 0 && (
            <DetailContent title="Produced by">
              {studios(main.production_companies)}
            </DetailContent>
          )}
          {!isMovie && main.created_by?.length > 0 && (
            <DetailContent title="Created by">
              {main.created_by
                .map((creator: TVSeriesCreator) => creator.name)
                .join(", ")}
            </DetailContent>
          )}
          {isMovie && (
            <>
              {credit.crew !== undefined && (
                <>
                  {credit.crew?.filter((crew: any) => crew.job === "Director")
                    .length > 0 && (
                    <DetailContent title="Directed by">
                      {credit.crew
                        ?.filter((crew: any) => crew.job === "Director")
                        .map((crew: any) => crew.name)
                        .join(", ")}
                    </DetailContent>
                  )}
                  {credit.crew?.filter((crew: any) => crew.job === "Screenplay")
                    .length > 0 && (
                    <DetailContent title="Screenplay by">
                      {credit.crew
                        ?.filter((crew: any) => crew.job === "Screenplay")
                        .map((crew: any) => crew.name)
                        .join(", ")}
                    </DetailContent>
                  )}{" "}
                </>
              )}
              {main.runtime > 0 && (
                <DetailContent title="Runtime">
                  {runtime(main.runtime)}
                </DetailContent>
              )}
            </>
          )}
        </section>
        {main.tagline?.length > 0 && (
          <blockquote className="quote">
            <FontAwesomeIcon icon={faQuoteLeft} className="mr-2 inline" />
            {main.tagline}
            <FontAwesomeIcon icon={faQuoteRight} className="ml-2 inline" />
          </blockquote>
        )}
        <Accordion type="multiple">
          <HiddenContent title="Overview">{main.overview}</HiddenContent>
          <HiddenContent title="Casts">
            <Carousel
              opts={{
                dragFree: true,
                watchDrag: true,
                align: "start",
                breakpoints: {
                  "(min-width: 768px)": {
                    active: false,
                  },
                },
              }}>
              <CarouselContent className="md:flex-wrap">
                {credit.cast.map((cast, i) => {
                  const cast_format = isMovie
                    ? character(cast.character as string)
                    : character(
                        cast.roles?.map(
                          (role: any) => role.character
                        )[0] as string
                      );
                  return (
                    <CarouselItem
                      key={cast.id}
                      className={cn(
                        "basis-auto flex flex-col items-center",
                        i !== 0 && "pl-6"
                      )}>
                      <Image
                        src={imgSrc(
                          cast.profile_path,
                          cast.gender === 1 ? personFemalePld : personMalePld
                        )}
                        alt={cast.name}
                        width={150}
                        height={225}
                        placeholder={ImageBlurData}
                        className="rounded-xl"
                      />
                      <hgroup className="flex flex-col items-center mt-2">
                        <h3 className="font-bold italic text-[1.05rem]">
                          {cast.name}
                        </h3>
                        {cast_format !== undefined &&
                          (cast_format.length > 1 ? (
                            <p className="dark:text-teal-300/85 text-sm text-center">
                              <span>{cast_format[0]}</span>
                              <span className="block">/{cast_format[1]}</span>
                            </p>
                          ) : (
                            <p className="dark:text-teal-300/85 text-sm">
                              {cast_format[0]}
                            </p>
                          ))}
                      </hgroup>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </HiddenContent>
        </Accordion>
      </section>
    </>
  );
}
