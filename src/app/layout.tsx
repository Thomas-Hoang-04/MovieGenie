import type { Metadata } from "next";
import { Blockletter, Hauora } from "./assets/fonts/font";
import "./globals.css";
import Provider from "./provider";
import Header from "./comp/Header/Header";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Next Test",
  authors: [{ name: "Minh Hai Hoang" }],
  description: "A Next.js test site",
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
        <Suspense fallback={<Loading />}>
          <Provider>
            <article className="max-w-[1440px] mx-auto">
              <Header />
              {children}
            </article>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
