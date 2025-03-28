import useFetch from "@/hooks/useFetch";
import { create } from "zustand";

interface User {
  _id: string;
  email: string;
  password: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
}

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

const useStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      set({ user: null, loading: true, error: null });

      const token = getCookie("auth-token");
      if (!token) throw new Error("No auth token found");

      console.log("Extracted Token:", token);

      const response = await useFetch({
        endpoint: "single-user",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      set({ user: response?.data?.data?.user, loading: false, error: null });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useStore;
