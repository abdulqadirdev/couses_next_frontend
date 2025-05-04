"use server";
import CourseModuleForm from "@/components/institute/update-course-list";

interface Params {
  params: { id: string };
}
const UpdateCourseModule = async ({ params }: Params) => {
  const { id } = await params;
  return <CourseModuleForm courseId={id} />;
};

export default UpdateCourseModule;
