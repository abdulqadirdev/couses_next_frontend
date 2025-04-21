"use client";

import Banner from "@/components/home/banner";
import Stats from "@/components/home/stats";
import FeaturedCourses from "@/components/home/featured-courses";
import CoursesWithCateories from "@/components/home/courses-categories";
import Testimonial from "@/components/home/testimonial";
import NoteSection from "@/components/home/note-section";
import InstituteCards from "@/components/home/instructor";

export default function CoursesLandingPage() {


  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-gray-100">
      {/* hero-banner */}
      <Banner />

      {/* stats section */}
      <Stats />

      {/* featured Courses */}
      <FeaturedCourses/>

      {/* courses with categories */}
      <CoursesWithCateories  />

      {/* Instructor section */}
      <InstituteCards />

      {/* testimonial section */}
      <Testimonial />

      {/* Note Section */}
      <NoteSection />

    </div>
  );
}
