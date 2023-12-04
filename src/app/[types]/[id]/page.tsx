import { Category } from "@/lib/types";
import Link from "next/link";

export default function Page({
  params,
}: {
  params: { types: Category; id: string };
}) {
  return (
    <>
      <Link href={`/${params.types}`}>Back to Search</Link>
      {params.types.toUpperCase()} {params.id}
    </>
  );
}
