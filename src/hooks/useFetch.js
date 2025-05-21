"use server";

import axios from "axios";

export default async function useFetch(ReqConfig) {
  const {
    endpoint = "/",
    method = "GET",
    headers = {},
    data = {},
    uploader
  } = ReqConfig;

  const url = process.env.API_URL + endpoint;
  console.log("url=>>", url);

  try {
    const response = await axios({
      method,
      url,
      headers: {
        ...headers,
      },
      data: method !== "GET" ? data : undefined,
    });

    return {
      success: true,
      message: response.data.message,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
      status: 500,
    };
  }
}
