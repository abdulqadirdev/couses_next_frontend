"use client";

import Banner from "@/components/home/banner";
import Stats from "@/components/home/stats";
import Footer from "@/components/footer";
import FeaturedCourses from "@/components/home/featured-courses";
import CoursesWithCateories from "@/components/home/courses-categories";
import Instructor from "@/components/home/instructor";
import Testimonial from "@/components/home/testimonial";
import NoteSection from "@/components/home/note-section";

export default function CoursesLandingPage() {
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
      featured: true,
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

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-gray-100">
      {/* hero-banner */}
      <Banner />

      {/* stats section */}
      <Stats />

      {/* featured Courses */}
      <FeaturedCourses courses={courses} />

      {/* courses with categories */}
      <CoursesWithCateories courses={courses} />

      {/* Instructor section */}
      <Instructor />

      {/* testimonial section */}
      <Testimonial />

      {/* Note Section */}
      <NoteSection />

      <Footer />
    </div>
  );
}
