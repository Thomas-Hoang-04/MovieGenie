export default function Page({
  params,
}: {
  params: { types: string; id: string };
}) {
  return (
    <>
      {params.types.toUpperCase()} {params.id}
    </>
  );
}
