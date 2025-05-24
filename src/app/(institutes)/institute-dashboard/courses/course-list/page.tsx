"use client";

import courseStore from "@/store/courses-store";
import userStore from "@/store/user-store";
import Link from "next/link";
import TableShow from "@/components/institute/tables/table";
import deleteCourseList from "@/apis/courses/delete-course-list";
import CourseRow from "@/components/institute/tables/courses-row";

const CourseList = () => {
  const { user } = userStore();
  const ownerId = user?.owner;

  const { courseList, pagination, loader, fetchCourseList, status } =
    courseStore();

  console.log("courseList==>",courseList);
  const tableHead = [
    { title: "Sno" },
    { title: "Course Module" },
    { title: "Created On" },
    { title: "Action" },
  ];
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 px-2 sm:px-6 md:px-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Course Lists
        </h1>
        <Link
          href="add-course-list"
          className="border-1 border-gray-300 py-2 px-4 rounded-lg text-sm"
        >
          Add Course List
        </Link>
      </div>
      <TableShow

        data={courseList}

        fetchData={fetchCourseList}
        pagination={pagination}
        status={status}
        loader={loader}
        ownerId={ownerId}
        initialParams="course-list"
        deleteFunc={deleteCourseList}
        btnText="Delete Module"
        loaderMessage="Deleting Module..."
        updatePageUrl="update-course-list"
        tableHead={tableHead}
        TableRow={CourseRow}
      />
    </>
  );
};

export default CourseList;
