"use server";
import { cookies } from "next/headers";
import useFetch from "../../hooks/useFetch";

export default async function updateCourseMaterial({ id = "", data }) {
  try {
    console.log("id==>", id, data);

    if (!id) {
      return {
        success: false,
        error: "Course Material id is not provided",
      };
    }
    let token = (await cookies()).get("auth-token")?.value;

    const endpoint = `courses/update-items/${id}`;
    console.log(endpoint);

    const response = await useFetch({
      endpoint,
      method: "PUT",
      data,
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
      error: error.message || "Failed to update material!",
    };
  }
}
