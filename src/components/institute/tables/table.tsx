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
import { useRouter } from "next/navigation";
import { DialogModal } from "@/components/shadcn-components/modal-box";
import CustomToastMsg from "@/components/toast-message";
import setMessageState from "@/helper/message-set";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CourseRow from "./courses-row";

interface Props {
  data: any;
  pagination: any;
  loader: boolean;
  status: boolean | null;
  fetchData: (params: any) => Promise<void>;
  ownerId: string | undefined;
  initialParams?: string;
  deleteFunc?: any;
  updatePageUrl?: string;
  btnText?: string;
  loaderMessage?: string;
  module?: string;
  tableHead?: { title: string }[] | [];
  TableRow?: any;
}

const TableShow = ({
  data,
  pagination,
  loader,
  status,
  fetchData,
  ownerId,
  initialParams = "manage-course",
  deleteFunc = null,
  updatePageUrl = "update-course",
  btnText = "Delete Course",
  loaderMessage = "Deleting Module...",
  tableHead = [],
  module = "",
  TableRow = null,
}: Props) => {

  const [isDeleted, setDeleted] = useState<boolean>(false);
  const [open, setOpen] = useState<{ [key: string]: boolean }>({
    deleted: false,
  });
  const [selectedCourse, setCourse] = useState<{ title: string; _id: string }>({
    title: "",
    _id: "",
  });
  const [search, setSearch] = useState<string>("");
  const [message, setMessage] = useState<{ error: boolean; message: string }>({
    error: false,
    message: "",
  });
  const [queries, setQueries] = useState<QueriesType>({
    search: "",
    limit: 5,
    page: 1,
  });
  
  const obj = { ...queries, id: module ? module : ownerId };
  const router = useRouter();

  interface QueriesType {
    search: string;
    limit: number;
    page: number;
    [key: string]: string | number;
  }

  const toggleModal = (dialog: string) => {
    setOpen((prev: any) => ({ ...prev, [dialog]: !prev[dialog] }));
  };

  const handleDelete = async () => {
    try {
      setDeleted(true);
      const res = await deleteFunc(selectedCourse._id);
      console.log(res);
      setDeleted(false);
      setMessageState(res, setMessage);
      toggleModal("deleted");
    } catch (error) {
      setMessage({ error: true, message: "Something went wrong!" });
      setDeleted(false);
    }
  };

  useEffect(() => {
    if (ownerId) {
      let searchParams = new URLSearchParams();
      for (const key in queries) {
        if (queries[key]) {
          searchParams.append(key, queries[key].toString());
        }
      }
      router.push(initialParams + "?" + searchParams.toString());

      fetchData(obj);
    }
  }, [queries, message.message, module]);



  useEffect(() => {
    if (queries.limit > pagination?.total) {
      setQueries((prev) => ({
        ...prev,
        page: 1,
      }));
    }
  }, [queries.limit]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setQueries((prev) => ({
        ...prev,
        search,
        page: 1,
      }));
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [search]);

  const handlePagination = (type: string) => {
    if (type === "inc") {
      if (queries.page < pagination?.totalPages) {
        setQueries((prev) => ({
          ...prev,
          page: prev.page + 1,
        }));
      }
    } else {
      if (queries.page > 1) {
        setQueries((prev) => ({
          ...prev,
          page: prev.page - 1,
        }));
      }
    }
  };

  const querySetter = (e: any) => {
    const { name, value } = e.target || e;
    setQueries((prev) => ({
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
    <div className="w-full px-2 sm:px-6 md:px-8 max-w-7xl mx-auto">
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
            onChange={querySetter}
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
                {tableHead?.map((theading: { title: string }, i: number) => (
                  <th
                    key={i}
                    className="p-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    {theading.title}
                  </th>
                ))}
              </tr>
            </thead>

            {TableRow && (
              <TableRow
                data={data}
                queries={queries}
                formatDate={formatDate}
                setOpen={setOpen}
                status={status}
                deleteFunc={deleteFunc}
                updatePageUrl={updatePageUrl}
                setCourse={setCourse}
                refetchData={fetchData}
                obj={obj}
              />
            )}
          </table>

          {open.deleted && (
            <DialogModal
              modalTitle="Confirm Box"
              open={open.deleted}
              onClose={() => toggleModal("deleted")}
              message={`Are you sure you want to delete ${selectedCourse?.title} course!`}
              btnText={btnText}
              onClick={handleDelete}
              loader={isDeleted}
              loaderMessage={loaderMessage}
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
            <ChevronLeft size={14} className="mr-1" />
            Previous
          </button>
          <button
            onClick={() => handlePagination("inc")}
            className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            disabled={queries.page >= pagination?.totalPages}
          >
            Next
            <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableShow;
