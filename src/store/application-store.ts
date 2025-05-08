import { create } from "zustand";
import getAllApplications from "@/apis/student-applications";

interface ApplicationModelType {
  _id: string;
  status: string;
  institute: string;
  appliedBy: string;
  phone: number;
  studentCnic: string;
  studentAddress: string;
  studentName: string;
  createdAt: string;
  updated: string;
}
interface Pagination {
  total?: number;
  limit?: number;
  page?: number;
  pages?: number;
}

interface ApplicationType {
  fetchAllApplications: (params: any) => Promise<void>;
  status: boolean;
  loader: boolean;
  applications: ApplicationModelType[] | [];
  error: string | null;
  pagination: Pagination | null;
}

export const applicationsStore = create<ApplicationType>((set) => ({
  status: false,
  loader: false,
  applications: [],
  pagination: null,
  error: null,

  fetchAllApplications: async (params) => {
    try {
      console.log("Params", params);

      set({ loader: true });
      const res = await getAllApplications(params);
      console.log(res);
      if (res.success) {
        set({
          status: true,
          loader: false,
          applications: res.data.applications,
          pagination: res.data.pagination,
        });
      } else {
        set({
          status: false,
          loader: false,
          error: res.error || "Failed to upload!",
        });
      }
    } catch (error: any) {
      console.error(error);
      set({
        status: false,
        loader: false,
        error: error || "Internal Server Error!",
      });
    }
  },
}));
