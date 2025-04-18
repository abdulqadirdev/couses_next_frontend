"use server";
import useFetch from "../../hooks/useFetch";

export default async function verifyOtp(formData) {
  console.log(formData);

  try {
    const data = {
      email: formData.email,
      otp: formData.otp,
    };
    console.log(data);
    
    const response = await useFetch({
      endpoint: "verify-otp",
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
