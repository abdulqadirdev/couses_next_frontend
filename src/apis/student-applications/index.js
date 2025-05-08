"use server";
import { cookies } from "next/headers";
import useFetch from "../../hooks/useFetch";

export default async function getAllApplications({
  limit = 10,
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

    let token = (await cookies()).get("auth-token")?.value;

    let queries = `limit=${limit}&page=${page}&search=${search}`;
    const endpoint = `all-application/${id}?${queries}`;
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
      error: error.message || "Failed to fetch own courses!",
    };
  }
}
