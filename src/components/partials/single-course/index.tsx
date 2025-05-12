"use client";

import Skeleton from "@/components/home/skeletons/cardSkeleton";
import SkeletonCardSingle from "@/components/home/skeletons/card-skeleton";
import resetSlug from "@/helper/reset-slug";
import courseStore from "@/store/courses-store";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import SingleCourseCard from "@/components/home/cards/single-course-card";

const SingleCourse = ({ id }: { id: string }) => {
  console.log(id);

  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const {
    fetchSingleCourse,
    singleCourse,
    loader2,
    fetchAllCourses,
    courses2,
  } = courseStore();
  console.log(singleCourse, courses2);

  const courseData = singleCourse;

  async function fetchCourse() {
    await fetchSingleCourse(id);
  }
  useEffect(() => {
    fetchCourse().finally(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (singleCourse) {
      fetchAllCourses({ id: singleCourse?.createdBy._id, limit: 4, sort: -1 });
    }
  }, [singleCourse]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      {/* Hero Section */}
      <Link
        href="/"
        className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors m-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span>Back</span>
      </Link>
      {!isLoaded ? (
        <SkeletonCardSingle />
      ) : (
        <SingleCourseCard isLoaded={isLoaded} courseData={courseData} />
      )}

      {/* Course Details Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex overflow-x-auto pb-4 mb-8 justify-center">
            <div className="inline-flex p-1 rounded-xl bg-gray-700/50 backdrop-blur-sm border border-gray-600/50">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "features"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab("institute")}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "institute"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Institute
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Course Description */}
                <div className="p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 text-purple-400 mr-2" />
                    Course Description
                  </h3>

                  <p className="text-gray-300 mb-4">
                    {courseData?.description}
                  </p>

                  {/* What You'll Learn */}
                  <div className="mt-6">
                    <h4 className="text-lg font-bold text-white mb-3">
                      What You'll Learn
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        "HTML, CSS and JavaScript fundamentals",
                        "Responsive web design techniques",
                        "Modern JavaScript frameworks",
                        "Mobile app development",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-4">
                  Course Features
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: <BookOpen className="h-5 w-5" />,
                      title: "Comprehensive Curriculum",
                      description:
                        "Covers all aspects of web and app development",
                    },
                    {
                      icon: <Users className="h-5 w-5" />,
                      title: "Expert Instructors",
                      description: "Learn from industry professionals",
                    },
                    {
                      icon: <Clock className="h-5 w-5" />,
                      title: "Flexible Learning",
                      description: "Study at your own pace",
                    },
                    {
                      icon: <Award className="h-5 w-5" />,
                      title: "Certification",
                      description: "Receive a certificate of completion",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-purple-900/30 text-purple-400">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">
                          {feature.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "institute" && (
              <div className="p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-purple-500 flex-shrink-0">
                    <img
                      src={
                        courseData?.createdBy.instituteLogo ||
                        "/placeholder.svg"
                      }
                      alt={courseData?.createdBy.instituteName}
                      className="object-contain p-2"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {courseData?.createdBy.instituteName}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {courseData?.createdBy.instituteName} is a leading
                      educational institution specializing in technology
                      education.
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-purple-900/30 text-purple-400">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-white text-sm">10,000+</div>
                          <div className="text-xs text-gray-400">Students</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-purple-900/30 text-purple-400">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-white text-sm">45+</div>
                          <div className="text-xs text-gray-400">Courses</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Courses Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Related Courses
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {courses2.length > 0 ? (
              courses2?.map((course) =>
                course._id === id ? (
                  ""
                ) : (
                  <div
                    key={course?._id}
                    className="group rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="object-cover w-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                      <span className="absolute bottom-2  left-2 bg-gray-900/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs capitalize text-white border border-gray-700/50">
                        {course.level}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="text-white font-medium mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                        {course.title}
                      </h3>

                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= Math.floor(4)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="text-gray-400 text-xs ml-1">{4}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-100 bg-purple-900/40 px-3 py-1 rounded-full">
                          {course.createdBy.instituteName}
                        </span>
                        <Link
                          href={`/single-course/${course?._id}`}
                          className="text-xs px-3 py-1.5 rounded-full bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 transition-colors duration-300"
                        >
                          View Course
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <Skeleton number={3} />
            )}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/courses"
              className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-white hover:bg-gray-700/80 hover:border-purple-500/30 transition-all duration-300"
            >
              View All Courses
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section className="py-12 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join hundreds of students who have already enrolled in this course
          </p>
          <button className="px-8 py-3 rounded-lg bg-white text-gray-900 font-bold hover:shadow-lg hover:shadow-white/25 transition-all duration-300">
            Enroll Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default SingleCourse;
