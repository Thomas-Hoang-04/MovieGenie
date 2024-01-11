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
  gender: number;
}

export interface GeneralDetails {
  id: number;
  name: string;
}

interface GeneralMotionDetails {
  title: string;
  backdrop_path: string;
  release_date: string;
  poster_path: string;
  overview: string;
  genres: GeneralDetails[];
  tagline: string;
  status: string;
  production_companies: GeneralDetails[];
}

export interface MovieDetails extends GeneralMotionDetails {
  runtime: number;
}

export interface TVSeriesCreator extends GeneralDetails {
  profile_path: string;
  gender: number;
  credit_id: string;
}

export interface TVDetails extends GeneralMotionDetails {
  created_by: TVSeriesCreator[];
}

export interface PersonDetails {
  name: string;
  profile_path: string;
  birthday: string;
  deathday: string;
  place_of_birth: string;
  biography: string;
  known_for_department: string;
  also_known_as: string[];
}

export interface CreditDetails {
  cast: {
    id: number;
    name: string;
    character?: string;
    roles?: {
      character: string;
      episode_count: number;
    }[];
    profile_path: string;
    gender: number;
  }[];
  crew?: {
    id: number;
    name: string;
    job: string;
    profile_path: string;
    gender: number;
  }[];
}

export type Details = MovieDetails | TVDetails | PersonDetails;

export type MotionDetails = Exclude<Details, PersonDetails>;
