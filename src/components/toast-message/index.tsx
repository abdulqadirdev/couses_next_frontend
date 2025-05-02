import { CheckCircle, XCircle } from "lucide-react";
import React, { useState, useEffect } from "react";

const CustomToastMsg = ({
  children,
  error,
  duration = 3000,
  toastReset,
}: any) => {
  const [show, setShow] = useState(true);
  console.log(error, show);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("chl rha hun");

      setShow(false);
      toastReset("");
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, error]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-[10%] left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 toast ${
        !error ? "bg-green-500" : "bg-red-500"
      } text-white`}
      style={{ zIndex: 99999 }}
    >
      {!error ? (
        <CheckCircle className="w-6 h-6 text-white" />
      ) : (
        <XCircle className="w-6 h-6 text-white" />
      )}
      <span>{children}</span>
    </div>
  );
};

export default CustomToastMsg;
