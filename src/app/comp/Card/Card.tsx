import { Button } from "@/components/ui/button";
import "./Card.scss";
import Link from "next/link";
import { ImageBlurData, MotionCardProps, PersonCardProps } from "@/lib/types";
import motionPldImg from "@/app/assets/images/motion-pld-img.png";
import personPldImg from "@/app/assets/images/person-pld-img.webp";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { imgSrc, releaseDate } from "@/lib/utils";

export function MotionCard({
  id,
  title,
  poster_path,
  release_date,
  type,
  query,
}: MotionCardProps): React.ReactElement {
  return (
    <article className="card">
      <Image
        src={imgSrc(poster_path, motionPldImg)}
        alt={title}
        width={200}
        height={300}
        placeholder={ImageBlurData}
      />
      <section className="card__content">
        <h1 className="card__title">{title}</h1>
        <p className="card__date">{releaseDate(release_date)}</p>
        <Link href={`/${type}/${id}`}>
          <Button
            className="card__btn"
            onClick={() => {
              sessionStorage.setItem("type", type);
              sessionStorage.setItem("query", query as string);
            }}>
            More info
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Link>
      </section>
    </article>
  );
}

export function PersonCard({
  id,
  name,
  profile_path,
  type,
  query,
}: PersonCardProps): React.ReactElement {
  return (
    <article className="card">
      <Image
        src={imgSrc(profile_path, personPldImg)}
        alt={name}
        width={400}
        height={600}
        placeholder={ImageBlurData}
      />
      <section className="card__content">
        <h1 className="card__title">{name}</h1>
        <Link href={`/${type}/${id}`}>
          <Button
            className="card__btn"
            onClick={() => {
              sessionStorage.setItem("type", type);
              sessionStorage.setItem("query", query as string);
            }}>
            More info
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Link>
      </section>
    </article>
  );
}
