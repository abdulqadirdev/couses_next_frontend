"use client";
import courseStore from "@/store/courses-store";
import userStore from "@/store/user-store";
import Link from "next/link";
import TableShow from "@/components/institute/tables/table";
import deleteCourse from "@/apis/courses/delete-course";
import ApplicationRow from "@/components/institute/tables/application-row";
import { applicationsStore } from "@/store/application-store";

const StudentApplications = () => {
  const { user } = userStore();
  const ownerId = user?.owner;

  const { applications, pagination, loader, fetchAllApplications, status } =
    applicationsStore();

  const tableHead = [
    { title: "Sno" },
    { title: "Student Name" },
    { title: "Email" },
    { title: "Status" },
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
        data={applications}
        fetchData={fetchAllApplications}
        pagination={pagination}
        status={status}
        loader={loader}
        ownerId={ownerId}
        initialParams="student-applications"
        deleteFunc={deleteCourse}
        tableHead={tableHead}
        TableRow={ApplicationRow}
      />
    </>
  );
};

export default StudentApplications;
