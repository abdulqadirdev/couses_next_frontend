import { create } from "zustand";
import uploadFile from "@/apis/file-upload";
interface FileStoreType {
  fileUploader: (file: any) => Promise<void>;
  status: boolean;
  fileloader: boolean;
  fileUrl: null;
  error: string | null;
}

export const fileStore = create<FileStoreType>((set) => ({
  status: false,
  fileloader: false,
  fileUrl: null,
  error: null,

  fileUploader: async (file) => {
    try {
      set({ fileloader: true });
      const res = await uploadFile(file);
      console.log(res);
      if (res.success) {
        set({
          status: true,
          fileloader: false,
          fileUrl: res.data.file,
        });
      } else {
        set({
          status: false,
          fileloader: false,
          error: res.error || "Failed to upload!",
        });
      }
    } catch (error: any) {
      console.error(error);
      set({
        status: false,
        fileloader: false,
        error: error || "Internal Server Error!",
      });
    }
  },
}));
