"use client";

import Login from "@/components/auth/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginApi from "@/apis/auth/login";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      setLoader(true);
      const result = await LoginApi(data);
      setLoader(false);

      if (result.success) {
        router.push("/");
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <Login
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      register={register}
      errors={error}
      loader={loader}
    />
  );
}
