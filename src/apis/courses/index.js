"use server";
import { cookies } from "next/headers";
import useFetch from "../../hooks/useFetch";

export default async function getCourses({
  limit = 10,
  page = 1,
  search = "",
  featured = "",
  category = "",
}) {
  try {

    let endpoint = "courses";
    let queries = `?limit=${limit}&page=${page}&search=${search}&featured=${featured}&category=${category}`;

    const response = await useFetch({
      endpoint: endpoint + queries,
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
      error: error.message || "Login failed",
    };
  }
}
