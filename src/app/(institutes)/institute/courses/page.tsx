"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import courseStore from "@/store/courses-store";
import userStore from "@/store/user-store";

const Courses = () => {
  const { courses2, fetchAllCourses } = courseStore();
  const { user, fetchUser } = userStore();

  const [search, setSearch] = useState<string>("");
  console.log("hy",user?.owner);

  const courses = courses2;

  const [queries, setQueries] = useState({
    search: "",
    limit: "5",
    page: "1",
  });

  console.log(courses2);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchAllCourses({ ...queries, params: user?.owner });
  }, [queries]);

  useEffect(() => {
    if (search) return;

    let timeOut = setTimeout(() => {
      setQueries((prev) => ({ ...prev, ["search"]: search }));
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [search]);

  const querySetter = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);

    setQueries((prev) => ({ ...prev, [name]: name !== "search" ? value : "" }));
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Function to delete a course with typed id
  // const deleteCourse = (id: number): void => {
  //   if (confirm("Are you sure you want to delete this course?")) {
  //     setCourses(courses.filter((course) => course.id !== id));
  //   }
  // };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Course Management
        </h1>
        <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base">
          Add New Course
        </button>
      </div>

      {/* Search and Limit Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Search size={16} />
          </div>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-sm text-gray-600">Show</span>
          <select
            name="limit"
            onChange={(e) => querySetter(e)}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>
      </div>

      {/* Table for larger screens */}
      <div className="hidden sm:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created On
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course, i) => (
                <tr key={course._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {i + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {course.title}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(course.createdAt)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                        // onClick={() => deleteCourse(course.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card view for mobile */}
      <div className="sm:hidden space-y-4">
        {courses.map((course, i) => (
          <div key={course._id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-500">
                  Created: {formatDate(course.createdAt)}
                </p>
              </div>
              {/* <span
                className={`px-2 text-xs leading-5 font-semibold rounded-full ${
                  course.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span> */}
            </div>
            <div className="flex justify-between items-center">
              {/* <p className="text-sm text-gray-500">
                {course.students} students
              </p> */}
              <div className="flex space-x-3">
                <button
                  className="text-blue-600 hover:text-blue-900 p-1"
                  title="View"
                >
                  <Eye size={18} />
                </button>
                <button
                  className="text-green-600 hover:text-green-900 p-1"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-900 p-1"
                  title="Delete"
                  // onClick={() => deleteCourse(course.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 bg-white rounded-lg shadow px-4 py-3">
        <div className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">{courses.length}</span> of{" "}
          <span className="font-medium">{courses.length}</span> entries
        </div>
        <div className="flex space-x-1 order-1 sm:order-2">
          <button
            className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            disabled
          >
            <ChevronLeft size={14} className="mr-1" /> Prev
          </button>
          <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            1
          </button>
          <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 flex items-center">
            Next <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
