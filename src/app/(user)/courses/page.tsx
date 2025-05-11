"use client";

import { useEffect, useMemo, useState } from "react";
import CoursesWithCategories from "@/components/home/cards/courses-categories";
import {
  Search,
  BookOpen,
  Sparkles,
  Zap,
  Filter,
  Flame,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import courseStore from "@/store/courses-store";
import { useRouter } from "next/navigation";

const CoursesPage = () => {
  const [level, setLevel] = useState("");
  const [featured, setIsFeatured] = useState(false);
  const [search, setSearch] = useState("");
  const [debounce, setDebounce] = useState<string>("");
  const { pagination } = courseStore();
  const [paginationNumber, setPaginationNumber] = useState<number>(1);
  const disAbledPrev = paginationNumber === 1;
  const disAbledNext = paginationNumber === pagination?.totalPages;

  interface Queries {
    level: string;
    featured: boolean;
    search: string;
    page: number;
    limit: number;
  }

  const queries: Queries = {
    level,
    featured,
    search: debounce,
    limit: 3,
    page: paginationNumber,
  };
  const obj = useMemo(
    () => queries,
    [level, featured, debounce, paginationNumber]
  );


  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounce(search);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [search]);

  const resetFilters = () => {
    setLevel("");
    setIsFeatured(false);
    setSearch("");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-purple-600/20 blur-3xl"></div>
        <div
          className="absolute top-1/3 -left-20 h-60 w-60 animate-pulse rounded-full bg-pink-600/10 blur-3xl"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/4 h-40 w-40 animate-pulse rounded-full bg-blue-600/10 blur-3xl"
          style={{ animationDuration: "12s" }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading with Icon */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-600 p-3 shadow-lg shadow-purple-500/20">
              <Flame className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-3 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            All Courses
          </h1>
          <p className="mx-auto max-w-2xl text-gray-300">
            Discover a wide range of courses designed to help you master new
            skills
          </p>
        </div>

        {/* Exciting Filter Box */}
        <div className="mb-10 overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-xl shadow-purple-900/5 backdrop-blur-sm">
          {/* Filter Header */}
          <div className="border-b border-gray-800 bg-gray-900/80 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">
                  Filter Courses
                </h2>
              </div>
              {(level || featured || search) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300 transition-all hover:border-red-500 hover:bg-gray-700 hover:text-red-300"
                >
                  <RefreshCw className="h-3 w-3" />
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Filter Content */}
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Search Input with Animation */}
              <div className="group relative">
                <div className="relative transition-all duration-300 group-hover:scale-[1.02]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 pl-10 text-white shadow-sm transition-all duration-300 placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 group-hover:border-purple-400 group-hover:shadow-md group-hover:shadow-purple-900/20"
                  />
                </div>
              </div>

              {/* Level Dropdown with Animation */}
              <div className="group relative">
                <div className="relative transition-all duration-300 group-hover:scale-[1.02]">
                  <Zap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full appearance-none rounded-md border border-gray-700 bg-gray-800 px-4 py-3 pl-10 pr-10 text-white shadow-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 group-hover:border-purple-400 group-hover:shadow-md group-hover:shadow-purple-900/20"
                  >
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg
                      className="h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Featured Toggle Switch */}
              <div className="flex items-center">
                <label className="flex cursor-pointer items-center gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={() => setIsFeatured(!featured)}
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-gray-700 transition peer-checked:bg-purple-600"></div>
                    <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:left-6 peer-checked:bg-white"></div>
                  </div>
                  <span className="flex items-center gap-1.5 text-white">
                    <Sparkles
                      className={`h-4 w-4 ${
                        featured ? "text-yellow-400" : "text-gray-400"
                      }`}
                    />
                    Featured Only
                  </span>
                </label>
              </div>
            </div>

            {/* Active Filters */}
            {(level || featured || search) && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-400">Active filters:</span>
                {level && (
                  <span className="inline-flex items-center rounded-full bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-200">
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </span>
                )}
                {featured && (
                  <span className="inline-flex items-center rounded-full bg-yellow-900/50 px-3 py-1 text-xs font-medium text-yellow-200">
                    Featured
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center rounded-full bg-blue-900/50 px-3 py-1 text-xs font-medium text-blue-200">
                    "{search}"
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Course Count Indicator with Pulse */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <BookOpen className="h-5 w-5 text-purple-400" />
              <span className="absolute -right-1 -top-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
              </span>
            </div>
            <span className="text-sm font-medium text-gray-300">
              Showing courses matching your criteria
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-300">
              Page {pagination?.page} of {pagination?.totalPages}
            </span>
          </div>
        </div>

        {/* Courses with Categories Component */}
        <div
          id="courses-section"
          className="rounded-xl bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-800/80 p-4 shadow-lg backdrop-blur-sm"
        >
          <CoursesWithCategories queries={obj} />
        </div>

        {/* Static Pagination Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() =>
                setPaginationNumber(
                  paginationNumber > 1 ? paginationNumber - 1 : 1
                )
              }
              disabled={disAbledPrev}
              className={`flex h-10 items-center justify-center rounded-md border border-gray-700  px-3 text-sm font-medium text-white transition-all 
                ${
                  disAbledPrev
                    ? "bg-gray-500 opacity-60"
                    : "bg-gray-800  hover:border-purple-500 hover:bg-gray-700"
                }`}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="hidden items-center space-x-1 sm:flex">
              {pagination?.totalPages ? (
                [...Array(pagination?.totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPaginationNumber(index + 1)}
                    className={`flex h-10 w-10 items-center justify-center
                     rounded-md  bg-purple-600 text-sm
                      font-medium text-white ${
                        paginationNumber === index + 1
                          ? "border-1 border-purple-500 bg-transparent"
                          : ""
                      }`}
                  >
                    {index + 1}
                  </button>
                ))
              ) : (
                <button
                  key={1}
                  className={`flex h-10 w-10 items-center justify-center rounded-md border-purple-500 bg-purple-600 text-sm font-medium text-white`}
                >
                  1
                </button>
              )}

              {/* <button className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-700 bg-gray-800 text-sm font-medium text-white hover:border-purple-500 hover:bg-gray-700">
                2
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-700 bg-gray-800 text-sm font-medium text-white hover:border-purple-500 hover:bg-gray-700">
                3
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-700 bg-gray-800 text-sm font-medium text-white hover:border-purple-500 hover:bg-gray-700">
                4
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-700 bg-gray-800 text-sm font-medium text-white hover:border-purple-500 hover:bg-gray-700">
                5
              </button> */}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setPaginationNumber(paginationNumber + 1)}
              disabled={disAbledNext}
              className={`flex h-10 items-center justify-center rounded-md border border-gray-700  px-3 text-sm font-medium text-white transition-all ${
                disAbledNext
                  ? "bg-gray-500 opacity-60"
                  : "bg-gray-800  hover:border-purple-500 hover:bg-gray-700"
              }`}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          {/* Mobile Page Indicator */}
          <div className="flex sm:hidden">
            <span className="text-sm text-gray-400">Page 1 of 5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
