"use client";

import Banner from "@/components/home/banner";
import Stats from "@/components/home/stats";
import FeaturedCourses from "@/components/home/cards/featured-courses";
import CoursesWithCateories from "@/components/home/cards/courses-categories";
import Testimonial from "@/components/home/testimonial";
import NoteSection from "@/components/home/note-section";
import InstituteCards from "@/components/home/instructor";
import CategorySection from "@/components/home/home-categories-section";

export default function CoursesLandingPage() {
  return (
    <div>
      {/* hero-banner */}
      <Banner />

      {/* stats section */}
      <Stats />

      {/* featured Courses */}
      <FeaturedCourses />

      {/* courses with categories */}
      <CategorySection />

      {/* Instructor section */}
      <InstituteCards />

      {/* testimonial section */}
      <Testimonial />

      {/* Note Section */}
      <NoteSection />
    </div>
  );
}
