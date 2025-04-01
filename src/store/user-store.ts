"use client";

import { create } from "zustand";
import { getSingleUser, logOut } from "@/apis/user/single-user-get";
import setRefereshToken from "@/apis/auth/referesh-token";

interface userObjTypes {
  _id: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  provider: string;
}

interface UserState {
  user: userObjTypes | null;
  status: boolean;
  error: string | null;
  loader: boolean;
  fetchUser: () => Promise<any>;
  logOutFunc: () => void;
}

const userStore = create<UserState>((set) => ({
  user: null,
  status: false,
  error: null,
  loader: false,

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

      set({
        user: singleUser?.data?.user,
        status: true,
        error: null,
        loader: true,
      });
    } catch (errors: any) {
      set({ user: null, status: false, error: errors?.message });
    }
  },

  logOutFunc: () => {
    logOut();
    set({ user: null, status: false, error: null });
  },
}));

export default userStore;
