"use client";

import courseStore from "@/store/courses-store";
import userStore from "@/store/user-store";
import Link from "next/link";
import TableShow from "@/components/institute/table";
import deleteCourseList from "@/apis/courses/delete-course-list";
import { useState } from "react";

const CourseMaterial = () => {
  const { user } = userStore();
  const ownerId = user?.owner;
  const [module, setModule] = useState<string>("");
  const {
    courseMaterial,
    courseList,
    pagination,
    loader,
    fetchCourseMaterials,
    fetchCourseList,
    status,
  } = courseStore();

  console.log(pagination, courseList);
  const tableHead = [
    { title: "Sno" },
    { title: "Course Material" },
    { title: "Created On" },
    { title: "Action" },
  ];
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 px-2 sm:px-6 md:px-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Course Material
        </h1>
        <div className="flex gap-3 items-end">
          <Link
            href="add-course-material"
            className="border-1 border-gray-300 py-2 px-4 rounded-lg text-sm"
          >
            Add Course Material
          </Link>
          <div className="flex flex-col space-x-2 w-full sm:w-auto">
            <span className="text-sm">Select Module</span>
            <select
              name="module"
              onChange={(e) => setModule(e.target.value)}
              onMouseOver={() => {
                if (courseList.length < 1) {
                  fetchCourseList({ id: ownerId });
                }
              }}
              className="border border-gray-300 rounded-md  py-2 px-4 w-[180px]  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All</option>
              {courseList.map((elem, i) => (
                <option value={elem._id} key={i}>
                  {elem.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <TableShow
        data={[courseMaterial]}
        fetchData={fetchCourseMaterials}
        pagination={pagination}
        status={status}
        loader={loader}
        ownerId={ownerId}
        initialParams="course-material"
        deleteFunc={deleteCourseList}
        btnText="Delete Module"
        loaderMessage="Deleting Module..."
        updatePageUrl="update-course-list"
        tableHead={tableHead}
        module={module}
      />
    </>
  );
};

export default CourseMaterial;
