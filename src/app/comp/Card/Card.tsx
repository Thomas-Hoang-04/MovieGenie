import { Button } from "@/components/ui/button";
import "./Card.scss";
import Link from "next/link";
import { Category } from "@/lib/types";

export interface CardProps {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  type: Category;
}

export default function Card({
  id,
  title,
  poster_path,
  release_date,
  type,
}: CardProps): React.ReactElement {
  return (
    <article className="card">
      <figure className="card__img">
        <img
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={title}
        />
      </figure>
      <h1 className="card__title">{title}</h1>
      <p className="card__date">{release_date.split("-")[0]}</p>
      <Link href={`/${type}/${id}`}>
        <Button className="card__btn">More info</Button>
      </Link>
    </article>
  );
}
