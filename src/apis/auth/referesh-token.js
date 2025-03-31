"use server";
import useFetch from "@/hooks/useFetch";
import { cookies } from "next/headers";

const setRefereshToken = async () => {
  try {
    let token = cookies().get("refresh-token")?.value;

    const response = await useFetch({
      endpoint: "referesh-token",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    

    if (response.success) {
      (await cookies()).set("auth-token", response.data?.data?.accessToken);
      (await cookies()).set("refresh-token", response.data?.data?.refreshToken);
      return {
        success: true,
        data: response?.data?.message,
      };
    } else {
      return {
        success: false,
        error: response.error,
      };
    }
  } catch (error) {
    return { success: false, error: error.message || "Failed to referesh token!" };
  }
};

export default setRefereshToken;
