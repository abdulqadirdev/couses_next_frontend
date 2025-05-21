"use server";

import SingleCourse from "@/components/partials/single-course";

const SimplifiedCoursePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  console.log(id);


  return <SingleCourse id={id} />;
};

export default SimplifiedCoursePage;
