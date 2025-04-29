"use client";
import userStore from "@/store/user-store";
import {
  ChevronDown,
  ChevronUp,
  ClipboardList,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = (): React.ReactNode => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdown] = useState(false);
  const { status, fetchUser, user, logOutFunc } = userStore();
  const userName = user?.userName?.split(" ") || [];

  const links = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Institutes", href: "/institutes" },
    { label: "Apply Now", href: "/apply" },
    { label: "Get Institute", href: "/apply" },
  ];

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur shadow-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-purple-400 hover:scale-105 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="h-8 w-8"
            viewBox="0 0 24 24"
          >
            <path d="..." /> {/* Your SVG Path Here */}
          </svg>
          <span className="text-xl">EduMaster</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-8 items-center">
          {links
            .filter((item) =>
              user?.owner ? item.label !== "Get Institute" : links
            )
            .map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  item.label === "Apply Now"
                    ? "text-white bg-purple-600 px-4 py-2 rounded-full hover:bg-purple-700"
                    : item.label === "Get Institute"
                    ? "text-white bg-transparent border-1 border-purple-600 px-4 py-2 rounded-full"
                    : "text-purple-300 hover:text-purple-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        {/* User/Auth Section */}
        <div className="flex items-center gap-4">
          {!status ? (
            <>
              <Link
                href="/login"
                className="hidden sm:block text-sm font-medium text-gray-300 hover:text-purple-400 transition"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition duration-300 transform hover:scale-105"
              >
                Sign Up Free
              </Link>
            </>
          ) : (
            <div className="relative flex items-center gap-3">
              {user?.owner && (
                <Link
                  href={"/institute-dashboard/dashboard"}
                  className="text-white bg-transparent border-1 border-purple-600 px-4 py-2 rounded-full"
                >
                  Dashboard
                </Link>
              )}

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-500 ring-2 ring-purple-500">
                <Image
                  src="/intructor_1.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Username */}
              <div
                className="flex items-center gap-1 cursor-pointer select-none"
                onClick={() => setDropdown(!dropdownOpen)}
              >
                <span className="text-white text-sm font-light">
                  {userName[userName.length - 1]}
                </span>
                {dropdownOpen ? (
                  <ChevronUp size={16} color="#fff" />
                ) : (
                  <ChevronDown size={16} color="#fff" />
                )}
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-white text-gray-800 rounded-md shadow-xl py-2 z-20 animate-fade-in">
                  <Link
                    href="#"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/user-applications"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition"
                  >
                    <ClipboardList className="mr-2 h-4 w-4" />
                    All Applications
                  </Link>
                  <button
                    onClick={logOutFunc}
                    className="w-full flex items-center px-4 py-2 text-sm text-left hover:bg-gray-100 transition"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}

              <button
                className="md:hidden text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden bg-gray-800 transition-all duration-300 overflow-hidden ${
          isMenuOpen
            ? "max-h-screen opacity-100 visible py-4"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col gap-4 px-4">
          {links.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                item.label === "Apply Now"
                  ? "text-white bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700"
                  : item.label === "Own Institute"
                  ? "text-white bg-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-700"
                  : "text-purple-300 hover:text-purple-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
