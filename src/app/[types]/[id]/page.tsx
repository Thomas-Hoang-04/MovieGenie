import { Category } from "@/lib/types";

export default function Page({
  params,
}: {
  params: { types: Category; id: string };
}) {
  return (
    <>
      {params.types.toUpperCase()} {params.id}
    </>
  );
}
