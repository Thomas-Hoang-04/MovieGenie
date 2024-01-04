export type Category = "movie" | "tv" | "person";

export const TypeText = (type: Category): string => {
  switch (type) {
    case "movie":
      return "movies";
    case "tv":
      return "TV series";
    case "person":
      return "artists";
  }
};

export interface ThemeProps {
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

export const ImageBlurData =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM88/tjPQAIjAM5+QEKmQAAAABJRU5ErkJggg==";

export interface MotionCardProps {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  type: Category;
  query: string;
}

export interface PersonCardProps {
  id: number;
  name: string;
  profile_path: string;
  type: "person";
  query: string;
}

export interface Details {
  id: number;
  name: string;
}
