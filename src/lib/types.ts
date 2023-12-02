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
