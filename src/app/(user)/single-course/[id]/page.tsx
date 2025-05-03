"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Award,
  Clock,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Users,
  CheckCircle,
  Star,
} from "lucide-react";

const courseData = {
  _id: "67fda7871134e93ff2ab298c",
  title: "Web & App",
  description: "lorem ipsum",
  category: "development",
  level: "Beginner",
  featured: false,
  image:
    "https://res.cloudinary.com/dhvtjvx8y/image/upload/v1744659944/Logo-05%20%281%29.png",
  createdAt: "2025-04-15T00:25:43.389Z",
  updatedAt: "2025-04-15T00:25:43.389Z",
  createdBy: {
    instituteName: "SMIT",
    instituteLogo:
      "https://res.cloudinary.com/dhvtjvx8y/image/upload/v1744659944/Logo-05%20%281%29.png",
  },
};

const relatedCourses = [
  {
    id: 1,
    title: "Advanced JavaScript Masterclass",
    image: "/placeholder.svg?height=200&width=300",
    price: 79.99,
    rating: 4.8,
    level: "Intermediate",
  },
  {
    id: 2,
    title: "UI/UX Design for Developers",
    image: "/placeholder.svg?height=200&width=300",
    price: 69.99,
    rating: 4.7,
    level: "Beginner",
  },
  {
    id: 3,
    title: "Full-Stack Development with MERN",
    image: "/placeholder.svg?height=200&width=300",
    price: 89.99,
    rating: 4.9,
    level: "Advanced",
  },
];

const SimplifiedCoursePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Animation on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/30"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute top-1/4 -left-20 w-60 h-60 bg-pink-600 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Courses</span>
          </Link>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Course Info */}
            <div>
              <div
                className={`inline-flex items-center rounded-full bg-purple-900/30 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur-sm border border-purple-800/30 mb-4 transform transition-all duration-700 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <Sparkles className="h-3 w-3 mr-2 text-purple-400" />
                {courseData.category.charAt(0).toUpperCase() +
                  courseData.category.slice(1)}
              </div>

              <h1
                className={`text-3xl md:text-4xl font-bold mb-4 transform transition-all duration-700 delay-100 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 animate-gradient">
                  {courseData.title}
                </span>
              </h1>

              <p
                className={`text-gray-300 mb-6 transform transition-all duration-700 delay-200 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {courseData.description}
              </p>

              <div
                className={`flex flex-wrap items-center gap-4 mb-6 transform transition-all duration-700 delay-300 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="text-gray-300">{courseData.level}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="text-gray-300">
                    Publish: {formatDate(courseData.createdAt)}
                  </span>
                </div>
              </div>

              {/* Institute Info */}
              <div
                className={`flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-6 transform transition-all duration-700 delay-400 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="relative h-12 content-center w-12 rounded-full overflow-hidden border-2 border-purple-500">
                  <img
                    src={
                      courseData.createdBy.instituteLogo || "/placeholder.svg"
                    }
                    alt={courseData.createdBy.instituteName}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Offered by</p>
                  <h3 className="text-white font-medium">
                    {courseData.createdBy.instituteName}
                  </h3>
                </div>
              </div>

              {/* CTA Button */}
              <div
                className={`transform transition-all duration-700 delay-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <button className="relative overflow-hidden px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group">
                  <span className="relative z-10 flex items-center justify-center">
                    Enroll Now
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute -inset-x-full bottom-0 h-px w-[200%] bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></span>
                </button>
              </div>
            </div>

            {/* Course Image */}
            <div
              className={`transform transition-all duration-700 delay-300 ${
                isLoaded
                  ? "translate-y-0 opacity-100 rotate-0"
                  : "translate-y-10 opacity-0 rotate-3"
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur"></div>
                <div className="relative rounded-xl overflow-hidden bg-gray-800/80 backdrop-blur-sm border border-gray-700/50">
                  <div className="relative aspect-video">
                    <img
                      src={courseData.image || "/placeholder.svg"}
                      alt={courseData.title}
                      className="object-contain p-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

                  <p className="text-gray-300 mb-4">{courseData.description}</p>

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
                        courseData.createdBy.instituteLogo || "/placeholder.svg"
                      }
                      alt={courseData.createdBy.instituteName}
                      className="object-contain p-2"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {courseData.createdBy.instituteName}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {courseData.createdBy.instituteName} is a leading
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
            {relatedCourses.map((course) => (
              <div
                key={course.id}
                className="group rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute bottom-2 left-2 bg-gray-900/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white border border-gray-700/50">
                    {course.level}
                  </div>
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
                          star <= Math.floor(course.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="text-gray-400 text-xs ml-1">
                      {course.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      ${course.price}
                    </span>
                    <Link
                      href={`/courses/${course.id}`}
                      className="text-xs px-3 py-1.5 rounded-full bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 transition-colors duration-300"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 8s ease infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default SimplifiedCoursePage;
