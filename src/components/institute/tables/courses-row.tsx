"use client";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const CourseRow = ({
  queries,
  data,
  formatDate,
  updatePageUrl,
  deleteFunc,
  setOpen,
  setCourse,
  status,
  refetchData = null,
  obj = null,
}: any) => {
  const router = useRouter();
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.length > 0 ? (
        data.map((elem: any, i: any) => (
          <tr key={i} className="hover:bg-gray-50">
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
                <span>{elem.title}</span>
              </div>
            </td>
            <td className="p-3 whitespace-nowrap text-sm text-gray-500">
              {formatDate(elem.createdAt)}
            </td>

            <td className="p-3 whitespace-nowrap text-sm font-medium">
              <div className="flex space-x-2">
                <Button
                  onClick={() => router.push(updatePageUrl + "/" + elem._id)}
                  className="text-white bg-blue-400"
                  title="Edit"
                >
                  <Pencil size={16} />
                </Button>
                {deleteFunc && (
                  <Button
                    onClick={() => {
                      setOpen({ ...open, deleted: true });
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
            colSpan={4}
            className="text-center py-6 text-sm text-gray-500 font-medium"
          >
            {status === null ? "Data fetching!" : "No Data Found!"}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default CourseRow;
