"use server";
import { cookies } from "next/headers";
import useFetch from "../../hooks/useFetch";

export default async function getCourses({
  limit = 10,
  page = 1,
  search = "",
  featured = "",
  category = "",
  params = "",
}) {
  try {
    console.log("params", params);

    let token = (await cookies()).get("auth-token")?.value;
    console.log(limit, page, featured, search, category);
    let endpoint = params ? "institute-courses" : "courses";
    params = params ? "/" + params : "";
    let queries = `?limit=${limit}&page=${page}&search=${search}&featured=${featured}&category=${category}`;
    console.log("hello=>>>>", endpoint + params + queries);

    const response = await useFetch({
      endpoint: endpoint + params + queries,
      header: {
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
      error: error.message || "Login failed",
    };
  }
}
