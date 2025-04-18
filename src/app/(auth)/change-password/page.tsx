"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import changePassApi from "@/apis/auth/change-password";
import ChangePasswordComponent from "@/components/auth/change-password";

export default function ChangePassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      setError(null);
      const result = await changePassApi(data);

      console.log(result);

      if (result.success) {
        router.push(`/Password-changed`);
        console.log("hy");
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <ChangePasswordComponent
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      register={register}
      errors={error}
    />
  );
}
