"use server";
import useFetch from "../../hooks/useFetch";

export default async function otpApi(formData) {
    console.log(formData);
    
  try {
    const data = {
      email: formData.email,
    };
    const response = await useFetch({
      endpoint: "forget-password",
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
