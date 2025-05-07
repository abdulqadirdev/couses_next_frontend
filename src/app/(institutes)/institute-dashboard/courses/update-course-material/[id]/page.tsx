"use server"
import CourseMaterialFormUpdate from "@/components/institute/update-course-material";

interface Params {
  params: { id: string };
}
const UpdateCourseMaterial = async({ params }: Params) => {
  const { id } = await params;

  return <CourseMaterialFormUpdate courseId={id}/>;
};

export default UpdateCourseMaterial;
