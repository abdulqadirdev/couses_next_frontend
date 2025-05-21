"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Phone,
  User,
  FileCheck,
  CalendarDays,
  Flame,
} from "lucide-react";
import Image from "next/image";
import { instituteStore } from "@/store/institute-store";
import userStore from "@/store/user-store";
import createApplications from "@/apis/student-applications/create-application";

interface Student {
  studentName: string;
  studentAddress: string;
  phone: string;
  studentCnic: string;
  institute: string;
}

export default function ApplyComponent({
  instituteId,
}: {
  instituteId: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { fetchSingleInstitute, institute } = instituteStore();
  const { user } = userStore();
  console.log("Institute=>>>", institute);

  useEffect(() => {
    if (instituteId) {
      fetchSingleInstitute({ id: instituteId });
    }
  }, [instituteId]);

  // Form handling

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Student>();

  const onSubmit = async (data: Student) => {
    setIsSubmitting(true);

    const studentData = {
      ...data,
      institute: instituteId,
      appliedBy: user?._id,
    };

    try {
      console.log("Submitting student data:", studentData);
      const createApplication = await createApplications(studentData);
console.log("created application",createApplication);

      setSubmitSuccess(true);
      // reset();

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      {/* Background Effects */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading with Icon */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-600 p-3 shadow-lg shadow-purple-500/20">
              <Flame className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-3 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Institute Details
          </h1>
          <p className="mx-auto max-w-2xl text-gray-300">
            View institute information and register as a student
          </p>
        </div>

        {/* Institute Details Card */}
        <div className="mb-10 overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-xl shadow-purple-900/5 backdrop-blur-sm">
          {/* Header */}
          <div className="border-b border-gray-800 bg-gray-900/80 px-6 py-4">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">
                Institute Information
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
              {/* Institute Logo */}
              <div className="flex-shrink-0">
                <div className="h-32 w-32 overflow-hidden rounded-xl border-2 border-gray-700 bg-gray-800 p-1">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt={institute?.instituteName || ""}
                    width={120}
                    height={120}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Institute Details */}
              <div className="flex-grow space-y-4">
                <div>
                  <h1 className="mb-1 text-2xl font-bold text-white">
                    {institute?.instituteName}
                  </h1>
                  <div className="inline-flex items-center rounded-full bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-200">
                    {institute?.approvedByAdmin
                      ? "Verified Institute"
                      : "Pending Verification"}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-purple-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Address
                        </p>
                        <p className="text-gray-200">
                          {institute?.instituteAddress}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-purple-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Contact Number
                        </p>
                        <p className="text-gray-200">{institute?.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <User className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-purple-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Owner CNIC
                        </p>
                        <p className="text-gray-200">{institute?.ownerCnic}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <CalendarDays className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-purple-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Created At
                        </p>
                        <p className="text-gray-200">
                          {new Date(
                            institute?.createdAt || ""
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Registration Form */}
        <div className="overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-xl shadow-purple-900/5 backdrop-blur-sm">
          {/* Form Header */}
          <div className="border-b border-gray-800 bg-gray-900/80 px-6 py-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">
                Student Registration
              </h2>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {submitSuccess && (
              <div className="mb-6 rounded-md bg-purple-900/30 p-4 text-purple-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-purple-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">
                      Registration submitted successfully!
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="group relative">
                  <label
                    htmlFor="studentName"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Full Name
                  </label>
                  <div className="relative transition-all duration-300 group-hover:scale-[1.01]">
                    <input
                      id="studentName"
                      type="text"
                      className={`w-full rounded-md border ${
                        errors.studentName
                          ? "border-red-500"
                          : "border-gray-700"
                      } bg-gray-800 px-4 py-3 text-white shadow-sm transition-all duration-300 placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 group-hover:border-purple-400 group-hover:shadow-md group-hover:shadow-purple-900/20`}
                      placeholder="e.g. Ali Raza"
                      {...register("studentName", {
                        required: "Name is required",
                      })}
                    />
                  </div>
                  {errors.studentName && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.studentName.message}
                    </p>
                  )}
                </div>

                <div className="group relative">
                  <label
                    htmlFor="studentCnic"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    CNIC Number
                  </label>
                  <div className="relative transition-all duration-300 group-hover:scale-[1.01]">
                    <input
                      id="studentCnic"
                      type="text"
                      className={`w-full rounded-md border ${
                        errors.studentCnic
                          ? "border-red-500"
                          : "border-gray-700"
                      } bg-gray-800 px-4 py-3 text-white shadow-sm transition-all duration-300 placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 group-hover:border-purple-400 group-hover:shadow-md group-hover:shadow-purple-900/20`}
                      placeholder="e.g. 35202-1234567-8"
                      {...register("studentCnic", {
                        required: "CNIC is required",
                        pattern: {
                          value: /^\d{5}-\d{7}-\d{1}$/,
                          message: "CNIC format should be: 12345-1234567-1",
                        },
                      })}
                    />
                  </div>
                  {errors.studentCnic && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.studentCnic.message}
                    </p>
                  )}
                </div>

                <div className="group relative">
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Phone Number
                  </label>
                  <div className="relative transition-all duration-300 group-hover:scale-[1.01]">
                    <input
                      id="phone"
                      type="text"
                      className={`w-full rounded-md border ${
                        errors.phone ? "border-red-500" : "border-gray-700"
                      } bg-gray-800 px-4 py-3 text-white shadow-sm transition-all duration-300 placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 group-hover:border-purple-400 group-hover:shadow-md group-hover:shadow-purple-900/20`}
                      placeholder="e.g. 3001234567"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10,11}$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="group relative md:col-span-2">
                  <label
                    htmlFor="studentAddress"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Address
                  </label>
                  <div className="relative transition-all duration-300 group-hover:scale-[1.01]">
                    <input
                      id="studentAddress"
                      type="text"
                      className={`w-full rounded-md border ${
                        errors.studentAddress
                          ? "border-red-500"
                          : "border-gray-700"
                      } bg-gray-800 px-4 py-3 text-white shadow-sm transition-all duration-300 placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 group-hover:border-purple-400 group-hover:shadow-md group-hover:shadow-purple-900/20`}
                      placeholder="e.g. House #123, Model Town, Lahore"
                      {...register("studentAddress", {
                        required: "Address is required",
                      })}
                    />
                  </div>
                  {errors.studentAddress && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.studentAddress.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
