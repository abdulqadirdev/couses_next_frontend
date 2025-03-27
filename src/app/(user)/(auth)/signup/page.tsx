"use client";
import { useForm } from "react-hook-form";
import SignUpApi from "@/apis/auth/signup";
import { useState } from "react";
import SignUp from "@/components/auth/signup";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
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
      const result = await SignUpApi(data);
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <SignUp
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={error}
    />
  );
}