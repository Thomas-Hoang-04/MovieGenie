import type { Metadata } from "next";
import { Blockletter, Hauora } from "./assets/fonts/font";
import "./globals.css";
import Provider from "./provider";
import Header from "./comp/Header/Header";
import NavBar from "./comp/NavBar/NavBar";
import BackToTop from "./comp/BackToTop/BackToTop";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "MovieGenie",
  authors: [{ name: "Minh Hai Hoang" }],
  description:
    "MovieGenie is a search engine that helps you find your favourite movies, TV shows, dramas, and so much more.",
  keywords: [
    "movies",
    "tv shows",
    "dramas",
    "search engine",
    "moviegenie",
    "actors",
    "actress",
  ],
  creator: "Minh Hai Hoang",
  publisher: "Minh Hai Hoang",
  alternates: { canonical: "https://moviegenie.vercel.app" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${Blockletter.className} ${Hauora.className}`}
      suppressHydrationWarning>
      <body className="dark:bg-dark bg-neutral-200 bg-opacity-[0.5]">
        <Provider>
          <BackToTop />
          <article className="max-w-[1440px] mx-auto">
            <Header />
            <section className="md:hidden">
              <NavBar />
            </section>
            {children}
          </article>
        </Provider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
