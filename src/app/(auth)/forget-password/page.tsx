"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import otpApi from "@/apis/auth/forget-password";
import ForgetPassword from "@/components/auth/forget-password/page";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      const result = await otpApi(data);
   
console.log(result);

      if (result.success) {
        router.push("/otp-page");
        console.log("hy");
        
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <ForgetPassword
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      register={register}
      errors={error}
    />
  );
}


