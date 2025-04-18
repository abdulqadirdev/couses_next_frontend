"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import verifyOtp from "@/apis/auth/verify-otp";
import OtpComponent from "@/components/auth/otp/page";

export default function otpPage({ params }: { params: { email: string } }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      const otp = data.otp;
      if (otp.length !== 6) return;
      data.email = params.email;
      const result = await verifyOtp(data);

      if (result.success) {
        router.push(`/change-password/email=${params.email}`);
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <OtpComponent
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      register={register}
      errors={error}
      setValue={setValue}
    />
  );
}
