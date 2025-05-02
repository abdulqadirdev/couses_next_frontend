"use server";
import { cookies } from "next/headers";
import useFetch from "../../hooks/useFetch";

export default async function createCourse(data) {
  try {
    let token = (await cookies()).get("auth-token")?.value;

    const response = await useFetch({
      endpoint: "courses",
      data,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.success) {
      return {
        success: true,
        data: response?.data?.data,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        error: response.error.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to fetch own courses!",
    };
  }
}
