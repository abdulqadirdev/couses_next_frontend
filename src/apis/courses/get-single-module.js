"use server";
import { cookies } from "next/headers";
import useFetch from "../../hooks/useFetch";

export default async function getSingleModule({ id = "" }) {
  try {
    console.log("id==>", id);

    if (!id) {
      return {
        success: false,
        error: "Module id is not provided",
      };
    }

    let token = (await cookies()).get("auth-token")?.value;
    const endpoint = `courses/single-category/${id}`;
    console.log(endpoint);

    const response = await useFetch({
      endpoint,
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
    return {
      success: false,
      error: error.message || "Failed to fetch own courses!",
    };
  }
}
