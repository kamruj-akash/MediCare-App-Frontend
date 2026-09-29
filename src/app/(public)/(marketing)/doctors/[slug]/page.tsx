import DoctorDetail from "@/components/modules/doctorsPage/doctorDetail";

export default async function DoctorSlugPage(
  props: PageProps<"/doctors/[slug]">,
) {
  const { slug } = await props.params;

  return <DoctorDetail doctorId={slug} />;
}
