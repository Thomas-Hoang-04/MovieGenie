import { Button } from "@/components/ui/button";
import "./Card.scss";
import Link from "next/link";
import { Category, ImageBlurData } from "@/lib/types";
import pldImg from "@/app/assets/images/pld-image.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
export interface CardProps {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  type: Category;
  query: string;
}

export default function Card({
  id,
  title,
  poster_path,
  release_date,
  type,
  query,
}: CardProps): React.ReactElement {
  const img_src =
    poster_path?.length > 0
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : pldImg;

  const date = release_date?.length > 0 ? release_date.split("-")[0] : "";

  return (
    <article className="card">
      <Image
        src={img_src}
        alt={title}
        width={200}
        height={300}
        placeholder={ImageBlurData}
      />
      <section className="card__content">
        <h1 className="card__title">{title}</h1>
        <p className="card__date">{date}</p>
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
