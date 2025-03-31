"use client";

import { create } from "zustand";
import getSingleUser from "@/apis/user/single-user-get";
import setRefereshToken from "@/apis/auth/referesh-token";

interface UserState {
  user: object | null;
  status: boolean;
  error: string | null;
  fetchUser: () => Promise<any>;
}

const userStore = create<UserState>((set) => ({
  user: null,
  status: false,
  error: null,

  fetchUser: async () => {
    try {
      set({ user: null, status: false, error: null });

      let singleUser = await getSingleUser();
      console.log(singleUser);

      if (!singleUser.success) {
        if (singleUser.error.message.message === "jwt expired") {
          let res = await setRefereshToken();
          console.log(res);
        }

        return set({
          user: null,
          status: false,
          error: "Failed to fetch user!",
        });
      }

      set({ user: singleUser, status: true, error: null });
    } catch (errors: any) {
      set({ user: null, status: false, error: errors?.message });
    }
  },
}));

export default userStore;
