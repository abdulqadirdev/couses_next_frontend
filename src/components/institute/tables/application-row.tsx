"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import updateApplication from "@/apis/student-applications/update-application";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import setMessageState from "@/helper/message-set";

const ApplicationRow = ({
  queries,
  data,
  formatDate,
  deleteFunc,
  setOpen,
  setCourse,
  status,
  refetchData = null,
  obj = null,
}: any) => {
  const [selectInp, setSelectInp] = useState<{ value: string; id: string }>({
    id: "",
    value: "",
  });
  const [message, setMessage] = useState<{ error: boolean; message: string }>({
    error: false,
    message: "",
  });

  console.log(selectInp);

  const updateCourse = async () => {
    if (!selectInp.value) return;

    try {
      let data = {
        status: selectInp.value,
      };
      let res = await updateApplication({
        id: selectInp.id,
        data,
      });
      console.log(res);

      setMessageState(res, setMessage);
    } catch (error) {
      console.error(error);
      setMessage({ error: true, message: "Something went wrong!" });
    }
  };
  useEffect(() => {
    updateCourse();
    refetchData && selectInp && refetchData(obj);
  }, [selectInp]);

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.length > 0 ? (
        data.map((elem: any, i: any) => (
          <tr
            key={i}
            className={`hover:bg-gray-50 ${
              elem.status === "rejected" ? "bg-gray-200 opacity-75" : ""
            }`}
          >
            <td className="p-3 whitespace-nowrap text-sm text-gray-500">
              {(queries.page - 1) * queries.limit + i + 1}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900 flex gap-2 items-center">
                {(elem.image || elem.icon) && (
                  <img
                    src={elem.image || elem.icon}
                    className="w-12 h-12 p-2 object-contain rounded-xl bg-gray-200"
                    alt={elem.title}
                  />
                )}
                <span>{elem.appliedBy.userName}</span>
              </div>
            </td>

            <td className="p-3 whitespace-nowrap text-sm text-gray-500">
              <Link href={`mailto:${elem.appliedBy.email}`}>
                {elem.appliedBy.email}
              </Link>
            </td>

            <td className="p-3 whitespace-nowrap text-sm text-gray-500">
              <span
                className={`${
                  elem.status == "approved"
                    ? "bg-green-500"
                    : elem.status === "rejected"
                    ? "bg-gray-800"
                    : "bg-red-500"
                } px-4 py-1 text-white rounded-full`}
              >
                {elem.status}
              </span>
            </td>

            <td className="p-3 whitespace-nowrap text-sm text-gray-500">
              {formatDate(elem.createdAt)}
            </td>

            <td className="p-3 whitespace-nowrap text-sm font-medium">
              <div className="flex space-x-2 items-center">
                <Select
                  value={selectInp.value}
                  onValueChange={(value) => {
                    setSelectInp({ value, id: elem._id });
                  }}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue
                      placeholder={
                        elem.status.slice(0, 1).toUpperCase() +
                        elem.status.slice(1).toLowerCase()
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Reject</SelectItem>
                  </SelectContent>
                </Select>
                {deleteFunc && (
                  <Button
                    onClick={() => {
                      setOpen({ deleted: true });
                      setCourse(elem);
                    }}
                    className="text-white bg-red-400"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={6}
            className="text-center py-6 text-sm text-gray-500 font-medium"
          >
            {status === null ? "Data fetching!" : "No Data Found!"}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default ApplicationRow;
