"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import courseStore from "@/store/courses-store";
import { useRouter } from "next/navigation";
import userStore from "@/store/user-store";
import { DialogModal } from "@/components/shadcn-components/modal-box";
import Link from "next/link";
import deleteCourse from "@/apis/courses/delete-course";
import CustomToastMsg from "@/components/toast-message";
import setMessageState from "@/helper/message-set";
import { Button } from "@/components/ui/button";
const Courses = () => {
  const { user } = userStore();
  const ownerId = user?.owner;
  const { ownCourses, pagination,loader, fetchOwnCourse, status } = courseStore();
  const [isDeleted, setDeleted] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCourse, setCourse] = useState<{ title: string; _id: string }>({
    title: "",
    _id: "",
  });
  const [loader2, setLoader2] = useState<boolean>(false);

  const toggleModal = (dialog: string) => {
    setOpen((prev: object) => ({ ...prev, [dialog]: !open[dialog] }));
  };

  const [search, setSearch] = useState<string>("");
  const [message, setMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: "",
  });
  const router = useRouter();

  interface QueriesType {
    search: string;
    limit: number;
    page: number;
    [key: string]: string | number;
  }
  const [queries, setQueries] = useState<QueriesType>({
    search: "",
    limit: 5,
    page: 1,
  });

  useEffect(() => {
    if (ownerId) {
      let searchParams = new URLSearchParams();
      for (const key in queries) {
        if (queries[key]) {
          searchParams.append(key, queries[key].toString());
        }
      }
      router.push("manage-course?" + searchParams.toString());
      let obj = { ...queries, instituteId: ownerId };

      fetchOwnCourse(obj);
    }
  }, [queries, message.message]);

  useEffect(() => {
    if (queries.limit > pagination?.total){
      setQueries((prev: any) => ({
        ...prev,
        page: 1,
      }));
    }
  }, [queries.limit]);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setQueries((prev: any) => ({
        ...prev,
        search,
        page: 1,
      }));
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [search]);

  const handleDelete = async () => {
    try {
      setDeleted(true);
      let res = await deleteCourse(selectedCourse._id);
      setDeleted(false);
      setMessageState(res, setMessage);
      toggleModal({ ...open });
    } catch (error) {
      setMessage({ error: true, message: "Something went wrong!" });
    }
  };

  const handlePagination = (type: string) => {
    if (type === "inc") {
      if (queries.page < pagination?.totalPages) {
        setQueries((prev: any) => ({
          ...prev,
          page: queries.page + 1,
        }));
      }
    } else {
      if (queries.page > 0 && queries.page <= pagination?.totalPages) {
        setQueries((prev: any) => ({
          ...prev,
          page: queries.page - 1,
        }));
      }
    }
  };

  const querySetter = (e: any) => {
    const { name, value } = e.target || e;

    setQueries((prev: any) => ({
      ...prev,
      [name]: name !== "search" ? value : "",
    }));
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="w-full px-2 sm:px-6 md:px-8  max-w-7xl mx-auto">
      {loader && (
        <div className="fixed top-0 left-0 z-20 h-screen w-full bg-white/10 flex justify-center items-center">
          <span className="loader-2"></span>
        </div>
      )}
      {message.message && (
        <CustomToastMsg error={message.error} toastReset={setMessage}>
          {message.message}
        </CustomToastMsg>
      )}
      <Menu className="block md:hidden" />
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Course Management
        </h1>
        <Link
          href={"add-course"}
          className="border-1 border-gray-300 py-2 px-4 rounded-lg text-sm"
        >
          Add Course
        </Link>
      </div>

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

      <div className="bg-white rounded-lg shadow overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-3 text-left text-xs font-medium  uppercase tracking-wider">
                  S.No
                </th>
                <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">
                  Course Name
                </th>
                <th className="p-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Created On
                </th>

                <th className="p-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.length > 0 ? (
                courses.map((course, i) => (
                  <tr key={course._id} className="hover:bg-gray-50">
                    <td className="p-3 whitespace-nowrap text-sm text-gray-500">
                      {(queries.page - 1) * queries.limit + i + 1}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {course.title}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(course.createdAt)}
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() =>
                            router.push(`update-course/${course._id}`)
                          }
                          className="text-white bg-blue-400"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          onClick={() => {
                            setOpen("deleted");
                            setCourse(course);
                          }}
                          className="text-white  bg-red-400"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-sm text-gray-500 font-medium"
                  >
                    {status === null ? "Data fetching!" : "No Data Found!"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {open && (
            <DialogModal
              modalTitle="Confirm Box"
              open={open}
              onClose={() => toggleModal("deleted")}
              message={`Are you sure you want to delete ${selectedCourse?.title} course!`}
              btnText={"Delete Course"}
              onClick={handleDelete}
              loader={isDeleted}
              loaderMessage="Deleting Message..."
            />
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 bg-white rounded-lg shadow px-4 py-3">
        <div className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
          Showing <span className="font-medium">{pagination?.page}</span> to{" "}
          <span className="font-medium">{pagination?.limit}</span> of{" "}
          <span className="font-medium">{pagination?.total}</span> entries
        </div>
        <div className="flex space-x-1 order-1 sm:order-2">
          <button
            onClick={() => handlePagination("dec")}
            className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            disabled={queries.page == 1}
          >
            <ChevronLeft size={14} className="mr-1" /> Prev
          </button>
          {[...Array(pagination?.totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => querySetter({ name: "page", value: i + 1 })}
              className={`px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm font-medium  ${
                i + 1 == queries.page ? "bg-blue-700 text-white" : ""
              } `}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePagination("inc")}
            className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 bg-gray-50 hover:bg-gray-100 flex items-center"
            disabled={queries.page == pagination?.totalPages}
          >
            Next <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
