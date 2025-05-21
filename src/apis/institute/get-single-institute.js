"use server";
import useFetch from "../../hooks/useFetch";

export default async function getSingleInstitute({ id = "" }) {
  try {
    console.log("id==>",id);
    
    if (!id) {
      return {
        success: false,
        error: "Institute id is not provided",
      };
    }

    const endpoint = `single-institute/${id}`;
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
      error: error.message || "Failed to fetch institute!",
    };
  }
}
