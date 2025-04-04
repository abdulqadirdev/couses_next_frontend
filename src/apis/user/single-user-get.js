"use server";

import useFetch from "@/hooks/useFetch";
import { cookies } from "next/headers";

const getSingleUser = async () => {
  
  try {
    let token = cookies().get("auth-token")?.value;

    const response = await useFetch({
      endpoint: "single-user",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.success) {
      return {
        success: true,
        data: response?.data?.data,
      };
    } else {
      return {
        success: false,
        error: response.error,
      };
    }
  } catch (error) {
    return { success: false, error: error.message || "Failed to fetch user!" };
  }
};

export default getSingleUser;
