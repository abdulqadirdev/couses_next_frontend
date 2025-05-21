import { create } from "zustand";
import getSingleInstitute from "@/apis/institute/get-single-institute";

interface Institute {
  _id: string;
  instituteName: string;
  instituteAddress: string;
  ownerCnic: string;
  phone: number;
  approvedByAdmin: boolean;
  instituteLogo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  total?: number;
  limit?: number;
  page?: number;
  pages?: number;
}

interface ApplicationType {
  fetchSingleInstitute: (params: any) => Promise<void>;
  status: boolean;
  loader: boolean;
  institute: Institute | null | undefined;
  error: string | null;
  pagination: Pagination | null;
}

export const instituteStore = create<ApplicationType>((set) => ({
  status: false,
  loader: false,
  institute: null,
  pagination: null,
  error: null,

  fetchSingleInstitute: async (params) => {
    try {
      console.log("Params", params);

      set({ loader: true });
      const res = await getSingleInstitute(params);
      console.log("Response=>>", res);
      if (res.success) {
        set({
          status: true,
          loader: false,
          institute: res.data.institute,
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
