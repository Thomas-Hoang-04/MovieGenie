export type Category = "movie" | "tv" | "person";

export const TypeText = (type: Category): string => {
  switch (type) {
    case "movie":
      return "movies";
    case "tv":
      return "TV series";
    case "person":
      return "actors/actress";
  }
};

export interface ThemeProps {
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

export const ImageBlurData =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM88/tjPQAIjAM5+QEKmQAAAABJRU5ErkJggg==";
