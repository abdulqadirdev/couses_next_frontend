import {

  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState, useEffect } from "react";

const OtpInput = ({ setValue, errors }: any) => {
  const [otp, setOtp] = useState<string>("");

  useEffect(() => {
    setValue("otp", otp);
  }, [otp, setValue]);

  return (
    <div className="flex flex-col items-center justify-center py-4 px-6">
      <InputOTP
        value={otp}
        onChange={setOtp}
        maxLength={6}
        className="space-x-3"
      >
        <InputOTPGroup>
          {[...Array(6)].map((_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="w-12 h-14 mx-1 text-center border border-gray-600 bg-[#1f2937] text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {errors && <p className="mt-3 text-red-500"> {errors}</p>}
    </div>
  );
};

export default OtpInput;

