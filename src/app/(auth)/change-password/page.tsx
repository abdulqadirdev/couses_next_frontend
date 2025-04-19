"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import changePassApi from "@/apis/auth/change-password";
import ChangePasswordComponent from "@/components/auth/change-password";

export default function ChangePassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      console.log(data);

      setError(null);
      let dataGet = {
        email: searchParams.get("email"),
        password: data.password,
      };
      const result = await changePassApi(dataGet);

      console.log(result);

      if (result.success) {
        router.push(`/success-page`);
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
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      watch={watch}
      onSubmit={onSubmit}
    />
  );
}
