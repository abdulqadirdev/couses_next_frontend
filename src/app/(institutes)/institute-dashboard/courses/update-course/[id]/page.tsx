"use server";
import CourseFormUpdate from "@/components/institute/forms/update-course-form";

interface Params {
  params: { id: string };
}
const UpdateCourse = async ({ params }: Params) => {
  const { id } = await params;
  return <CourseFormUpdate courseId={id} />;
};

export default UpdateCourse;
