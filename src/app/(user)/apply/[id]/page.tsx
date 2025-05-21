import ApplyComponent from "@/components/partials/apply-page-component";

export default async function InstitutePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <ApplyComponent instituteId={id} />;
}
