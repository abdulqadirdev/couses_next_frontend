"use client";

import OtpInput from "@/components/shadcn-components/otp-input";
import { BookOpen, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";


function OtpComponent({ handleSubmit, onSubmit, register,setValue }: any) {
  const [cooldown, setCooldown] = useState(0);

  // Handle OTP resend logic
  const handleResendOtp = () => {
    // Simulate sending OTP again
    setCooldown(30); // Set cooldown to 30 seconds

    // Countdown every second
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev === 1) {
          clearInterval(interval); // Clear the interval when cooldown ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      setCooldown(0);
    };
  }, []);


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827] bg-gradient-to-br from-[#111827] to-[#1a1f35] px-4 py-12 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-[60%] right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-md z-10 relative">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-3 rounded-xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>

            <span className="ml-3 text-3xl font-bold text-white">
              EduMaster
            </span>

          </div>
        </div>

        <div className="bg-[#1e2235]/80 backdrop-blur-sm border border-[#2a2f45] rounded-2xl shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-purple-500/20 to-transparent rounded-bl-full" />
          <div className="p-8 relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Enter OTP</h2>
              <p className="text-gray-400 text-sm">

                Please enter the 6-digit code sent to your email to verify your
                identity.

              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <OtpInput register={register} setValue={setValue}/>


              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-purple-600/30 flex items-center justify-center"
              >
                <span>Verify</span>
                <ChevronRight className="ml-2 h-5 w-5 animate-pulse-subtle" />
              </button>
            </form>


            <div className="text-center mt-6">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={cooldown > 0}
                className={`mt-4 text-sm font-medium ${
                  cooldown > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-purple-400 hover:text-purple-300"
                } transition-colors`}
              >
                {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
              </button>
            </div>
            <div className="mt-6 text-center">
              <a
                href="/login"
                className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 transition-colors"
              >
                Back to login
              </a>
            </div>
          </div>
        </div>


        <div className="text-center mt-6">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={cooldown > 0}
            className={`w-full mt-4 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 transform ${
              cooldown > 0
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
            } shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
          >
            {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Privacy Policy
          </a>
          .

        </div>
      </div>
    </div>
  );
}

export default OtpComponent;
