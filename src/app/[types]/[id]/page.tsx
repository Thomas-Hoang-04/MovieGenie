import { Category } from "@/lib/types";
import type { Metadata } from "next";
import Link from "next/link";
import "./page.scss";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "@/components/ui/separator";
import { cn, motionCheck, releaseDate } from "@/lib/utils";
import { extractData, getPageData } from "@/lib/data_utils";
import { MotionContent } from "@/app/comp/PageContent/PageContent";

export const generateMetadata = async ({
  params,
}: {
  params: { types: Category; id: string };
}): Promise<Metadata> => {
  const data = await getPageData(params.types, params.id);
  const main = extractData(data.metadata, params.types);
  const title = motionCheck(main) ? main.title : main.name;
  const release = motionCheck(main)
    ? `(${releaseDate(main.release_date)})`
    : "";

  return {
    title: `${title} ${
      params.types === "tv" ? "(TV Series)" : ""
    } ${release} - MovieGenie`,
  };
};

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
        <Link
          href={`/${params.types}`}
          className={cn(
            params.types !== "person" && "motion-link",
            params.types === "person" && "person-link"
          )}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <p className="hidden md:inline">Back</p>
        </Link>
      </Button>
      <Separator className="seperator-id" />
      {motionCheck(main) && (
        <MotionContent main={main} raw_credit={data.credit} />
      )}
    </>
  );
}
