"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = (): React.ReactNode => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = [
        "home",
        "courses",
        "categories",
        "instructors",
        "testimonials",
        "pricing",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-gray-900/95 backdrop-blur shadow-lg" : "bg-gray-700"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={"/"}
          className="flex items-center gap-2 font-bold text-purple-400"
        >
          {" "}
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
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link
            href="#home"
            className={`text-sm font-medium transition-colors hover:text-purple-400 ${
              activeSection === "home" ? "text-purple-400" : "text-gray-300"
            }`}
          >
            Home
          </Link>
          <Link
            href="#courses"
            className={`text-sm font-medium transition-colors hover:text-purple-400 ${
              activeSection === "courses" ? "text-purple-400" : "text-gray-300"
            }`}
          >
            Courses
          </Link>
          <Link
            href="#categories"
            className={`text-sm font-medium transition-colors hover:text-purple-400 ${
              activeSection === "categories"
                ? "text-purple-400"
                : "text-gray-300"
            }`}
          >
            Categories
          </Link>
          <Link
            href="#instructors"
            className={`text-sm font-medium transition-colors hover:text-purple-400 ${
              activeSection === "instructors"
                ? "text-purple-400"
                : "text-gray-300"
            }`}
          >
            Instructors
          </Link>
          <Link
            href="#testimonials"
            className={`text-sm font-medium transition-colors hover:text-purple-400 ${
              activeSection === "testimonials"
                ? "text-purple-400"
                : "text-gray-300"
            }`}
          >
            Testimonials
          </Link>
          <Link
            href="#pricing"
            className={`text-sm font-medium transition-colors hover:text-purple-400 ${
              activeSection === "pricing" ? "text-purple-400" : "text-gray-300"
            }`}
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:block text-sm font-medium text-gray-300 transition-colors hover:text-purple-400"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up Free
          </Link>
          <button
            className="md:hidden rounded-md p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
          <Link
            href="#home"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
          >
            Home
          </Link>
          <Link
            href="#courses"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Courses
          </Link>
          <Link
            href="#categories"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Categories
          </Link>
          <Link
            href="#instructors"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Instructors
          </Link>
          <Link
            href="#testimonials"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Testimonials
          </Link>
          <Link
            href="#pricing"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
