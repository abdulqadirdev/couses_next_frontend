"use server";

import SingleCourse from "@/components/partials/single-course";
import { Suspense } from "react";

const SimplifiedCoursePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  console.log(id);

  // Fallback loader

  return <SingleCourse id={id} />;
};

export default SimplifiedCoursePage;
