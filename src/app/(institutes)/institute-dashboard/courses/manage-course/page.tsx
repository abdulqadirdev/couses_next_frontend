"use client";
import courseStore from "@/store/courses-store";
import userStore from "@/store/user-store";
import Link from "next/link";
import TableShow from "@/components/institute/tables/table";
import deleteCourse from "@/apis/courses/delete-course";
import CourseRow from "@/components/institute/tables/courses-row";

const Courses = () => {
  const { user } = userStore();
  const ownerId = user?.owner;

  const { ownCourses, pagination, loader, fetchOwnCourse, status } =
    courseStore();

  const tableHead = [
    { title: "Sno" },
    { title: "Course Name" },
    { title: "Created On" },
    { title: "Action" },
  ];
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 px-2 sm:px-6 md:px-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Course Management
        </h1>
        <Link
          href="add-course"
          className="border-1 border-gray-300 py-2 px-4 rounded-lg text-sm"
        >
          Add Course
        </Link>
      </div>
      <TableShow
        data={ownCourses}
        fetchData={fetchOwnCourse}
        pagination={pagination}
        status={status}
        loader={loader}
        ownerId={ownerId}
        initialParams="manage-course"
        deleteFunc={deleteCourse}
        tableHead={tableHead}
        TableRow={CourseRow}
      />
    </>
  );
};

export default Courses;
