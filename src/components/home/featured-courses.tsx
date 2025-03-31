import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

export interface Course {
  id: number;
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
}

export interface FeaturedCourseProps {
  courses: Course[];
} 

const FeaturedCourses = ({ courses }: FeaturedCourseProps) => {
  const featuredCourses = courses.filter((course) => course.featured);

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

        <Swiper slidesPerView={3} spaceBetween={20}>
          {featuredCourses.map((course) => (
            <SwiperSlide key={course.id}>
              <div className="h-full rounded-xl border border-gray-800 bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:scale-105">
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    width={400}
                    height={250}
                    alt={course.title}
                    className="w-full object-cover image-feature-course"
                  />
                  <div className="absolute top-2 right-2 rounded-full bg-purple-600 px-2 py-1 text-xs font-medium text-white">
                    Featured
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  {course.title}
                </h3>
                <p className="mb-4 text-gray-400 line-clamp-2">
                  {course.description}
                </p>
                <div className="text-xl font-bold text-white">
                  ${course.price}
                </div>
                <Link
                  href="#"
                  className="mt-4 block w-full rounded-md bg-purple-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-700 transition-all duration-300"
                >
                  Enroll Now
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-12 text-center">
          <Link
            href="#categories"
            className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300"
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
