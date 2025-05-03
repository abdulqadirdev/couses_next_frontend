"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Calendar, Award, Clock, TrendingUp } from "lucide-react";
import courseStore from "@/store/courses-store";
import Skeleton from "./cardSkeleton";
import CourseCard from "./course-card";

interface Category {
  slug: string;
  name: string;
}

const CoursesWithCategories = () => {
  const { filteredCourse, courses, fetchCategories,category } = courseStore();
  console.log(category);
  
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(courses);

  const categories: Category[] = [
    { slug: "", name: "All Courses" },
    { slug: "data-science", name: "Data Science" },
    { slug: "development", name: "Web Development" },
    { slug: "design", name: "Design & UX" },
    { slug: "marketing", name: "Marketing" },
    { slug: "security", name: "Cybersecurity" },
  ];
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    filteredCourse({ category: activeCategory, featured: false }).finally(() =>
      setIsLoading(false)
    );
  }, [activeCategory]);

  return (
    <section className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      {/* Glowing Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-pink-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-900/30 backdrop-blur-sm border border-purple-800/50">
            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
            <span className="text-sm font-medium text-purple-300">
              Premium Courses
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 animate-gradient">
              Expand Your Knowledge
            </span>
          </h2>
          <p className="max-w-2xl text-gray-300 text-lg md:text-xl opacity-80">
            Discover expert-led courses designed to help you master new skills
            and advance your career
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              className={`relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300
              ${
                activeCategory === category.slug
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                  : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50 hover:border-purple-500/30"
              }`}
            >
              {activeCategory === category.slug && (
                <>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-50"></span>
                  <span className="absolute -inset-x-full bottom-0 h-px w-[200%] bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-shimmer"></span>
                </>
              )}
              <span className="relative z-10">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <Skeleton />
          ) : courses && courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <div className="text-gray-400 col-span-full text-center">
              No courses found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoursesWithCategories;
