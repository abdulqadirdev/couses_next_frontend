"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import courseStore from "@/store/courses-store";
import { useEffect, useState } from "react";
import { Award, Calendar, TrendingUp } from "lucide-react";
import Skeleton from "../skeletons/cardSkeleton";
import CourseCard from "./course-card";

export interface Course {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  price: number;
  instructor: string;
  featured: boolean;
  createdAt: string;
}

const FeaturedCourses = () => {
  const { fetchAllCourses, courses2 } = courseStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchAllCourses({ featured: true }).finally(() => setIsLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const responsive = {
    380: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 3.5,
    },
  };

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-purple-900/50 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur">
            <span className="mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
            Featured Courses
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Expand Your Knowledge
          </h2>
          <p className="max-w-[900px] text-gray-400 md:text-lg">
            Browse our most popular courses taught by industry experts and gain
            the skills you need to succeed.
          </p>
        </div>

        <Swiper
          slidesPerView={3.5}
          spaceBetween={20}
          breakpoints={responsive}
          className="pad-custom"
        >
          {isLoading ? (
            <div className="grid grid-cols-4 gap-2">
              <Skeleton />
            </div>
          ) : courses2 && courses2.length > 0 ? (
            courses2.map((course) => (
              <SwiperSlide key={course._id}>
                <CourseCard key={course._id} course={course} />
              </SwiperSlide>
            ))
          ) : (
            <div className="text-gray-400 col-span-full text-center">
              No courses found in this category.
            </div>
          )}
        </Swiper>

        <div className="mt-12 text-center">
          <Link
            href="courses"
            className="inline-flex items-center mb-3 text-sm font-medium text-purple-400 hover:text-purple-300"
          >
            View All Courses
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-1 h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
