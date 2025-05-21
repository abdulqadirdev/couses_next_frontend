"use client";

import { useState, useEffect, useMemo } from "react";
import courseStore from "@/store/courses-store";
import Skeleton from "../skeletons/cardSkeleton";
import CourseCard from "./course-card";
import ButtonSkeleton from "../skeletons/button-skeleton";
import getSlug from "@/helper/get-slug";
import { useRouter } from "next/navigation";

interface Category {
  title: string;
}

const CoursesWithCategories = ({ queries, pageUrl = "/" }: any) => {
  const {
    filteredCourse,
    courses: course2,
    category,
    fetchCategories,
  } = courseStore();

  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  console.log(activeCategory);

  useEffect(() => {
    setIsLoading2(true);
    fetchCategories().finally(() => setIsLoading2(false));
  }, []);
  console.log(category);

  useEffect(() => {
    setIsLoading(true);
    const searchParams = new URLSearchParams();

    let query = { ...queries, category: activeCategory };
    for (const key in queries) {
      const value = queries[key];
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    }
    router.push(pageUrl + "?" + searchParams.toString() + "#courses-section");

    filteredCourse(query).finally(() => {
      setIsLoading(false);
    });
  }, [activeCategory, queries]);

  const categories: Category[] = useMemo(() => category, [category]);
  const courses = useMemo(() => course2, [course2]);

  return (
    <div>
      {/* Glowing Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-pink-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setActiveCategory("")}
            className={`relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300
                  ${
                    !activeCategory
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                      : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50 hover:border-purple-500/30"
                  }`}
          >
            All Courses
          </button>
          {isLoading2 && categories.length < 1 && <ButtonSkeleton />}
          {categories.map((category, index) => {
            const key = category.title || `category-${index}`;
            const displaySlug = getSlug(category.title);

            return (
              <button
                key={key}
                onClick={() => setActiveCategory(displaySlug)}
                className={`relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300
                  ${
                    activeCategory === displaySlug
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                      : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50 hover:border-purple-500/30"
                  }`}
              >
                {activeCategory === displaySlug && (
                  <>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-50"></span>
                    <span className="absolute -inset-x-full bottom-0 h-px w-[200%] bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-shimmer"></span>
                  </>
                )}
                <span className="relative z-10">{category.title}</span>
              </button>
            );
          })}
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
    </div>
  );
};

export default CoursesWithCategories;
