import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MovieGenie",
    short_name: "MovieGenie",
    description:
      "Get to know more about your favourite movies, dramas, TV shows, actors, actress and more",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "100x100",
        type: "image/png",
      },
    ],
    start_url: "/",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
  };
}
