"use server";
import useFetch from "../../hooks/useFetch";

export default async function getSingleMaterial({ id = "" }) {
  try {
    console.log("MaterialId==>", id);

    if (!id) {
      return {
        success: false,
        error: "Material id is not provided",
      };
    }

    const endpoint = `courses/single-items/${id}`;
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
      error: error.message || "Failed to fetch course material!",
    };
  }
}
