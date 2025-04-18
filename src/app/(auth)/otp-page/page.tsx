"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import verifyOtp from "@/apis/auth/verify-otp";
import OtpComponent from "@/components/auth/otp";

export default function otpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const [error, setError] = useState<string | null>(null);


  const onSubmit = async (data: any) => {
    try {
      let dataGet = {
        email: searchParams.get("email"),
        otp: data.otp,
      };
      console.log(dataGet, searchParams);

      const result = await verifyOtp(dataGet);
      console.log(result);

      if (result.success) {
        router.push(`/change-password?email=${searchParams.get("email")}`);
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      console.error(err);
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

    />
  );
}



