"use server";
import { cookies } from "next/headers";
import useFetch from "../../hooks/useFetch";

export default async function uploadFile(file, uploader = null) {
  try {
    let token = (await cookies()).get("auth-token")?.value;
    console.log("fileGot=>>>", file);

    const response = await useFetch({
      endpoint: "upload-file",
      method: "POST",
      data: file,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uploader,
    });
    console.log("hello", response);

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
      error: error.message || "Failed to upload file!",
    };
  }
}
