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
      className="border-none md:mb-2">
      <AccordionTrigger className="hover:no-underline font-bold dark:font-semibold text-2xl md:text-3xl pb-3">
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
    <p className="italic text-wrap font-medium mb-1 md:text-xl gap-1 md:mt-2">
      <span className="font-bold">{title}: &nbsp;</span>
      {children}
    </p>
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
          className="dark:opacity-75 relative xl:rounded-b-md border-none"
        />
      </article>
      <main className="content">
        <article className="main-content">
          <section className="poster">
            <Image
              src={imgSrc(main.poster_path, motionPldImg)}
              alt={main.title}
              width={200}
              height={300}
              placeholder={ImageBlurData}
              className="rounded-lg md:max-laptop:w-[300px] laptop:w-[250px] mx-auto dark:shadow-none shadow-xl"
            />
          </section>
          <section className="main-details">
            <h1 className="text-[1.75rem] leading-snug font-bold italic md:text-4xl">
              {main.title}
            </h1>
            <div className="flex gap-2 md:gap-3 items-center mt-1 md:mt-2">
              {main.release_date.length > 0 && (
                <p className="text-lg font-medium italic md:text-2xl">
                  {releaseDate(main.release_date)}
                </p>
              )}
              <Badge
                variant={statusVariant(main.status)}
                className="text-sm md:text-base font-bold border-none rounded-full tracking-[0.0125rem] px-3">
                {isMovie &&
                  (main.status === "Planned" ? "Rumored" : main.status)}
                {!isMovie && TVStatusDisplay(main.status)}
              </Badge>
            </div>
            <section className="flex gap-2 mt-4 mb-1 flex-wrap md:gap-3">
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
                      {credit.crew?.filter(
                        (crew: any) => crew.job === "Director"
                      ).length > 0 && (
                        <DetailContent title="Directed by">
                          {credit.crew
                            ?.filter((crew: any) => crew.job === "Director")
                            .map((crew: any) => crew.name)
                            .join(", ")}
                        </DetailContent>
                      )}
                      {credit.crew?.filter(
                        (crew: any) => crew.job === "Screenplay"
                      ).length > 0 && (
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
          </section>
        </article>
        {main.tagline?.length > 0 && (
          <blockquote className="quote">
            <FontAwesomeIcon icon={faQuoteLeft} className="mr-2 inline" />
            {main.tagline}
            <FontAwesomeIcon icon={faQuoteRight} className="ml-2 inline" />
          </blockquote>
        )}
        <Accordion type="multiple">
          <HiddenContent title="Overview">
            <p className="md:text-xl font-medium">{main.overview}</p>
          </HiddenContent>
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
              <CarouselContent className="md:grid md:grid-cols-2 xl:grid-cols-3">
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
                        "basis-auto flex max-md:flex-col items-center md:mt-6",
                        i !== 0 && "max-md:pl-6"
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
                      <hgroup className="flex flex-col max-md:items-center mt-2 md:ml-4 grow">
                        <h3 className="font-bold italic text-[1.05rem] md:text-2xl md:mb-1 char">
                          {cast.name}
                        </h3>
                        {cast_format !== undefined &&
                          (cast_format.length > 1 ? (
                            <p className="dark:text-teal-300/85 text-sm md:text-lg max-md:text-center">
                              <span>{cast_format[0]}</span>
                              <span className="max-md:block">
                                /{cast_format[1]}
                              </span>
                            </p>
                          ) : (
                            <p className="dark:text-teal-300/85 text-sm md:text-lg char">
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
      </main>
    </>
  );
}
