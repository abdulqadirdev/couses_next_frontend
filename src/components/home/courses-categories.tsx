import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface categories {
  id: string;
  name: string;
}

interface filteredCourse {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  lessons: string;
  level: string;
  featured: string;
  rating: number;
  price: number;
}

const CoursesWithCateories = ({ courses }: any) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Courses" },
    { id: "development", name: "Web & Mobile Development" },
    { id: "data", name: "Data Science & AI" },
    { id: "design", name: "Design & UX" },
    { id: "marketing", name: "Marketing" },
    { id: "security", name: "Cybersecurity" },
  ];

  const filteredCourses =
    activeCategory === "all"
      ? courses
      : courses.filter(
          (course: filteredCourse) => course.category === activeCategory
        );

  return (
    <>
      <section id="categories" className="w-full py-20 md:py-32 bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-purple-900/50 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur">
              <span className="mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
              Course Categories
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              Find Your Perfect Course
            </h2>
            <p className="max-w-[900px] text-gray-400 md:text-lg">
              Browse courses by category and find the perfect match for your
              learning goals.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category: categories) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course: filteredCourse) => (
              <div
                key={course.id}
                className="rounded-xl border border-gray-700 bg-gray-800 p-6 transition-all duration-300 hover:border-purple-500/50 hover:transform hover:scale-105"
              >
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    width={400}
                    height={250}
                    alt={course.title}
                    className="w-full object-cover image-feature-course-2"
                  />
                  {course.featured && (
                    <div className="absolute top-2 right-2 rounded-full bg-purple-600 px-2 py-1 text-xs font-medium text-white">
                      Featured
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center rounded-full bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-300">
                    {course.category === "development"
                      ? "Development"
                      : course.category === "data"
                      ? "Data Science"
                      : course.category === "design"
                      ? "Design"
                      : course.category === "marketing"
                      ? "Marketing"
                      : course.category === "security"
                      ? "Security"
                      : "Other"}
                  </span>
                  <span className="text-xs text-gray-400">{course.level}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white line-clamp-1">
                  {course.title}
                </h3>
                <p className="mb-4 text-sm text-gray-400 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-400">
                    {course.lessons} lessons
                  </span>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 text-yellow-400 mr-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs text-gray-400">
                      {course.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                  <div className="text-lg font-bold text-white">
                    ${course.price}
                  </div>
                  <Link
                    href="#"
                    className="rounded-md bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursesWithCateories;
