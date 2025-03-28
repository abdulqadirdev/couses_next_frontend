"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Banner from "@/components/home/banner";
import Stats from "@/components/home/stats";

export default function CoursesLandingPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description:
        "Learn HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and launch your career as a full-stack developer.",
      image: "/web_dev_course.jpg",
      category: "development",
      level: "Beginner to Advanced",
      duration: "12 weeks",
      lessons: 120,
      students: 15420,
      rating: 4.8,
      price: 89.99,
      instructor: "Sarah Johnson",
      featured: true,
    },
    {
      id: 2,
      title: "Data Science & Machine Learning Masterclass",
      description:
        "Master data analysis, visualization, and machine learning algorithms. Work with real datasets and build a portfolio of projects.",
      image: "/data-science.jpg",
      category: "data",
      level: "Intermediate",
      duration: "10 weeks",
      lessons: 85,
      students: 8750,
      rating: 4.7,
      price: 99.99,
      instructor: "Michael Chen",
      featured: true,
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description:
        "Learn the principles of user interface and experience design. Create stunning designs using Figma and build a professional portfolio.",
      image: "/ui-ux.avif",
      category: "design",
      level: "Beginner",
      duration: "8 weeks",
      lessons: 64,
      students: 12300,
      rating: 4.9,
      price: 79.99,
      instructor: "Emily Rodriguez",
      featured: true,
    },
    {
      id: 4,
      title: "Mobile App Development with Flutter",
      description:
        "Build cross-platform mobile apps for iOS and Android using Flutter and Dart. Deploy your apps to app stores and reach millions of users.",
      image: "/app-development.avif",
      category: "development",
      level: "Intermediate",
      duration: "9 weeks",
      lessons: 78,
      students: 6840,
      rating: 4.6,
      price: 84.99,
      instructor: "David Kim",
      featured: false,
    },
    {
      id: 5,
      title: "Advanced JavaScript: From Fundamentals to Mastery",
      description:
        "Deep dive into JavaScript concepts like closures, prototypes, async/await, and more. Become a JavaScript expert and ace your interviews.",
      image: "/advanced-js.jpg",
      category: "development",
      level: "Advanced",
      duration: "6 weeks",
      lessons: 52,
      students: 9250,
      rating: 4.8,
      price: 69.99,
      instructor: "James Wilson",
      featured: false,
    },
    {
      id: 6,
      title: "Digital Marketing & SEO Strategies",
      description:
        "Learn how to grow your online presence, optimize for search engines, and run effective digital marketing campaigns.",
      image: "/digital-seo.jpg",
      category: "marketing",
      level: "Beginner to Intermediate",
      duration: "7 weeks",
      lessons: 60,
      students: 7830,
      rating: 4.7,
      price: 74.99,
      instructor: "Jessica Martinez",
      featured: false,
    },
    {
      id: 7,
      title: "Cybersecurity Fundamentals",
      description:
        "Learn the basics of network security, ethical hacking, and how to protect systems from cyber threats and vulnerabilities.",
      image: "/cyber-security.jpg",
      category: "security",
      level: "Intermediate",
      duration: "8 weeks",
      lessons: 70,
      students: 5420,
      rating: 4.8,
      price: 94.99,
      instructor: "Robert Chen",
      featured: false,
    },
    {
      id: 8,
      title: "Blockchain & Cryptocurrency Development",
      description:
        "Understand blockchain technology and build decentralized applications. Learn Solidity and smart contract development.",
      image: "/block-chain.jpg",
      category: "development",
      level: "Advanced",
      duration: "10 weeks",
      lessons: 88,
      students: 4230,
      rating: 4.6,
      price: 109.99,
      instructor: "Alex Thompson",
      featured: false,
    },
  ];

  const instructors = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Web Development Instructor",
      bio: "Full-stack developer with 10+ years of experience. Previously worked at Google and Amazon.",
      image: "./intructor_1.jpg",
      courses: 12,
      students: 25000,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Science Instructor",
      bio: "PhD in Computer Science with specialization in Machine Learning. Former Data Scientist at Netflix.",
      image: "./intructor_2.jpg",
      courses: 8,
      students: 18000,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UI/UX Design Instructor",
      bio: "Award-winning designer with experience at top design agencies. Passionate about creating intuitive user experiences.",
      image: "./intructor_3.jpg",
      courses: 6,
      students: 15000,
      rating: 4.9,
    },
    {
      id: 4,
      name: "David Kim",
      role: "Mobile Development Instructor",
      bio: "Mobile app developer who has published over 20 apps with millions of downloads. Specializes in Flutter and React Native.",
      image: "./intructor_4.jpg",
      courses: 5,
      students: 12000,
      rating: 4.7,
    },
    {
      id: 5,
      name: "James Wilson",
      role: "JavaScript Instructor",
      bio: "JavaScript expert and open source contributor. Author of several programming books and conference speaker.",
      image: "./intructor_5.jpg",
      courses: 10,
      students: 22000,
      rating: 4.8,
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer",
      company: "TechCorp",
      content:
        "The web development bootcamp completely changed my career. I went from knowing nothing about coding to landing a job as a frontend developer within 3 months of completing the course. The projects were challenging but extremely rewarding.",
      image: "/placeholder.svg?height=100&width=100",
      course: "Complete Web Development Bootcamp",
      rating: 5,
    },
    {
      id: 2,
      name: "Lisa Wang",
      role: "Data Analyst",
      company: "FinanceAI",
      content:
        "The data science course was exactly what I needed to transition from traditional analytics to machine learning. The instructor explained complex concepts in an easy-to-understand way, and the hands-on projects gave me real-world experience.",
      image: "/placeholder.svg?height=100&width=100",
      course: "Data Science & Machine Learning Masterclass",
      rating: 5,
    },
    {
      id: 3,
      name: "Mark Johnson",
      role: "Product Designer",
      company: "CreativeStudio",
      content:
        "As someone with no design background, I was amazed at how quickly I was able to create professional-looking designs after taking the UI/UX course. The instructor's feedback was invaluable, and I now have a portfolio that has helped me land multiple freelance gigs.",
      image: "/placeholder.svg?height=100&width=100",
      course: "UI/UX Design Fundamentals",
      rating: 5,
    },
    {
      id: 4,
      name: "Sophia Garcia",
      role: "Mobile Developer",
      company: "AppWorks",
      content:
        "The Flutter course was comprehensive and up-to-date. I appreciated how the instructor covered both the basics and advanced topics. I was able to publish my first app to both app stores before even finishing the course!",
      image: "/placeholder.svg?height=100&width=100",
      course: "Mobile App Development with Flutter",
      rating: 4,
    },
  ];

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
      : courses.filter((course) => course.category === activeCategory);

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-gray-100">
      <main className="flex-1">
        {/* hero-banner */}
        <Banner />
        {/* stats section */}
        <Stats />

        <section id="courses" className="w-full py-20 md:py-32 bg-gray-900">
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
                Browse our most popular courses taught by industry experts and
                gain the skills you need to succeed.
              </p>
            </div>

            <Swiper slidesPerView={3} spaceBetween={20}>
              {courses
                .filter((course) => course.featured)
                .map((course) => (
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
              {categories.map((category) => (
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
              {filteredCourses.map((course) => (
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
                    <span className="text-xs text-gray-400">
                      {course.level}
                    </span>
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

        <section id="instructors" className="w-full py-20 md:py-32 bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-purple-900/50 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur">
                <span className="mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
                Expert Instructors
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                Learn From The Best
              </h2>
              <p className="max-w-[900px] text-gray-400 md:text-lg">
                Our instructors are industry professionals with years of
                real-world experience.
              </p>
            </div>
            <div className="py-20">
              <Swiper slidesPerView={3} spaceBetween={20}>
                {instructors.map((instructor) => (
                  <SwiperSlide key={instructor.id}>
                    <div className="h-[350px] rounded-xl border border-gray-800 bg-gray-800">
                      <div className="flex flex-col items-center text-center p-6">
                        <div className="relative mb-4">
                          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur"></div>
                          <div className="relative h-32 w-32 overflow-hidden rounded-full">
                            <img
                              src={instructor.image}
                              alt={instructor.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <h3 className="mb-1 text-xl font-bold text-white">
                          {instructor.name}
                        </h3>
                        <p className="mb-3 text-sm text-purple-400">
                          {instructor.role}
                        </p>
                        <p className="mb-4 text-gray-400 text-sm">
                          {instructor.bio}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="w-full py-20 md:py-32 bg-gray-800"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-purple-900/50 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur">
                <span className="mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
                Student Success Stories
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                What Our Students Say
              </h2>
              <p className="max-w-[900px] text-gray-400 md:text-lg">
                Hear from students who have transformed their careers with our
                courses.
              </p>
            </div>

            <Swiper spaceBetween={20} slidesPerView={2} className="w-full">
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id} className="h-auto">
                  <div className="h-full rounded-xl border border-gray-800 bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-700">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          width={48}
                          height={48}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="mb-4 text-gray-300">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {Array(5)
                          .fill(null)
                          .map((_, j) => (
                            <svg
                              key={j}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={
                                j < testimonial.rating ? "currentColor" : "none"
                              }
                              stroke="currentColor"
                              className={`h-4 w-4 ${
                                j < testimonial.rating
                                  ? "text-yellow-400"
                                  : "text-gray-600"
                              }`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                      </div>
                      <span className="text-sm text-purple-400">
                        {testimonial.course}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section id="pricing" className="w-full py-20 md:py-32 bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-purple-900/50 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur">
                <span className="mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
                Membership Plans
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                Choose Your Learning Path
              </h2>
              <p className="max-w-[900px] text-gray-400 md:text-lg">
                Get unlimited access to our courses with our flexible membership
                plans.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {[
                {
                  title: "Basic",
                  price: "$9.99",
                  period: "per month",
                  description:
                    "Perfect for beginners looking to explore our platform.",
                  features: [
                    "Access to 50+ courses",
                    "Basic course materials",
                    "Course completion certificates",
                    "24/7 support",
                    "7-day money-back guarantee",
                  ],
                  popular: false,
                  cta: "Get Started",
                },
                {
                  title: "Pro",
                  price: "$19.99",
                  period: "per month",
                  description:
                    "Ideal for serious learners who want to master new skills.",
                  features: [
                    "Access to all 500+ courses",
                    "Premium course materials",
                    "Course completion certificates",
                    "Downloadable resources",
                    "Priority support",
                    "30-day money-back guarantee",
                    "Access to live Q&A sessions",
                  ],
                  popular: true,
                  cta: "Get Started",
                },
                {
                  title: "Teams",
                  price: "$49.99",
                  period: "per month",
                  description:
                    "For organizations looking to upskill their employees.",
                  features: [
                    "Everything in Pro plan",
                    "Up to 10 team members",
                    "Team progress tracking",
                    "Custom learning paths",
                    "Dedicated account manager",
                    "Team analytics dashboard",
                    "Bulk enrollment discounts",
                  ],
                  popular: false,
                  cta: "Contact Sales",
                },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`relative rounded-xl ${
                    plan.popular
                      ? "border-2 border-purple-500"
                      : "border border-gray-700"
                  } bg-gray-900 overflow-hidden`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="h-20 w-20 bg-purple-600 rotate-45 transform translate-x-8 -translate-y-8 flex items-end justify-center">
                        <span className="text-xs font-medium text-white mb-2 -rotate-45">
                          POPULAR
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {plan.title}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-4xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-400">{plan.period}</span>
                    </div>
                    <p className="text-gray-400 mb-6">{plan.description}</p>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5 text-purple-400 mt-0.5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="#"
                      className={`block w-full rounded-md ${
                        plan.popular
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                      } px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-xl border border-gray-700 bg-gray-900 p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Need a custom plan for your organization?
                  </h3>
                  <p className="text-gray-400">
                    Contact our sales team to discuss your specific requirements
                    and get a tailored quote.
                  </p>
                </div>
                <Link
                  href="#"
                  className="rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 whitespace-nowrap"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-purple-900 to-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl text-white">
                Start Your Learning Journey Today
              </h2>
              <p className="max-w-[600px] text-gray-300 md:text-lg">
                Join thousands of students already learning on our platform and
                take the next step in your career.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-800"
                >
                  <span className="relative rounded-md bg-gray-900 px-5 py-2.5 transition-all duration-300 ease-in-out group-hover:bg-opacity-0">
                    Sign Up Free
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="ml-1 inline-block h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700"
                >
                  Browse Courses
                </Link>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                No credit card required. 7-day free trial on all plans.
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-gray-900 pt-12 pb-6 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <div>
              <div className="flex items-center gap-2 font-bold text-purple-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8"
                >
                  <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                  <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                  <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                </svg>
                <span className="text-xl">EduMaster</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering learners worldwide with high-quality online
                education.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Courses</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Data Science
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    UI/UX Design
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Mobile Development
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Digital Marketing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Learning Paths
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Free Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Career Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Student Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Affiliate Program
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    For Enterprise
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} EduMaster Inc. All rights
              reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-400">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-400">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-400">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
