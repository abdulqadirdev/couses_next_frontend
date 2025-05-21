"use server";
import { cookies } from "next/headers";
import useFetch from "../../hooks/useFetch";

export default async function getCoursesLists({
  limit = 15,
  page = 1,
  search = "",
  id = "",
}) {
  try {
    if (!id) {
      return {
        success: false,
        error: "Institute Id is not provided",
      };
    }
console.log("idGet",id);

    let endpoint = `courses/category/${id}`;
    let queries = `?limit=${limit}&page=${page}&search=${search}`;
    let token = (await cookies()).get("auth-token")?.value;

    const response = await useFetch({
      endpoint: endpoint + queries,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("hello", response);

    if (response.success) {
      return {
        success: true,
        data: response?.data?.data,
        pagination: response?.data?.pagination,
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
      error: error.message || "Failed to fetch courses lists!",
    };
  }
}
