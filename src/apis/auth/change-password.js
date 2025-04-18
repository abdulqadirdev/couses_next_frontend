"use server";
import useFetch from "../../hooks/useFetch";

export default async function changePassApi(formData) {
  console.log(formData);

  try {
    const data = {
      password: formData.password,
    };
    console.log(data);

    const response = await useFetch({
      endpoint: "change-password",
      method: "POST",
      data,
    });

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: response.error,
      };
    }

    // throw new Error('Authentication failed');
  } catch (error) {
    return {
      success: false,
      error: error.message || "Login failed",
    };
  }
}
