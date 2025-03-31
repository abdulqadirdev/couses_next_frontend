"use client";

import userStore from "@/store/user-store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = (): React.ReactNode => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { status, fetchUser } = userStore();

  const sections = [
    "home",
    "courses",
    "categories",
    "instructors",
    "testimonials",
    "pricing",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

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

  useEffect(() => {
    fetchUser();
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8"
          >
            <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
            <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
          </svg>
          <span className="text-xl">EduMaster</span>
        </Link>

        <nav className="hidden md:flex gap-8">
          {sections.map((item) => (
            <Link
              key={item}
              href={`#${item}`}
              className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                activeSection === item ? "text-purple-400" : "text-gray-300"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {!status ? (
            <>
              <Link
                href="/login"
                className="hidden sm:block text-sm font-medium text-gray-300 transition-colors hover:text-purple-400"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Sign Up Free
              </Link>
            </>
          ) : (
            <>
              <div className="w-10 h-10 flex items-center rounded-full bg-gray-500 overflow-hidden relative">
                <Image
                  src="/intructor_1.jpg"
                  alt="profile_img"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                className="md:hidden text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ☰
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}

      <div
        className={`md:hidden bg-gray-800 overflow-hidden transition-all duration-300 ${
          isMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        {sections.map((item) => (
          <Link
            key={item}
            href={`#${item}`}
            className="block px-4 py-3 text-base font-medium text-gray-300 hover:bg-gray-700"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
