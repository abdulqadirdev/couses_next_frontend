"use server";
import useFetch from "../../hooks/useFetch";

export default async function getCategories() {
  try {
    const endpoint = `categories`;
    console.log(endpoint);

    const response = await useFetch({
      endpoint,
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
