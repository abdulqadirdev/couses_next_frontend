"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111827] text-white px-4">
      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Password Changed!</h1>
      <p className="text-gray-400 mb-6 text-center max-w-md">
        Your password has been changed successfully. You can now use your new
        password to log in.
      </p>
      <button
        onClick={() => router.push("/login")}
        className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition"
      >
        Back to Login
      </button>
    </div>
  );
};

export default SuccessPage;
