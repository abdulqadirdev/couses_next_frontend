import { create } from "zustand";
import uploadFile from "@/apis/file-upload";
interface FileStoreType {
  fileUploader: (file: any) => Promise<void>;
  status: boolean;
  loader: boolean;
  fileUrl: null;
  error: string | null;
}

export const fileStore = create<FileStoreType>((set) => ({
  status: false,
  loader: false,
  fileUrl: null,
  error: null,

  fileUploader: async (file) => {
    try {
      set({ loader: true });
      const res = await uploadFile(file);
      console.log(res);
      if (res.success) {
        set({
          status: true,
          loader: false,
          fileUrl: res.data.file,
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
