"use client";
import { Upload, BookOpen, Clock } from "lucide-react";
import TextArea from "../element-components/text-area";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SelectInp } from "../element-components/select-inp";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { fileStore } from "@/store/file-upload";
import createCourseMaterial from "@/apis/courses/create-course-material";
import { useState } from "react";
import CustomToastMsg from "../toast-message";
import courseStore from "@/store/courses-store";
import userStore from "@/store/user-store";

const CourseMaterialForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  interface Message {
    error: boolean;
    message: string;
  }
  const [preview, setPreview] = useState<string | null>(null);
  const { fileUploader, loader } = fileStore();
  const [message, setMessage] = useState<Message>({
    error: false,
    message: "",
  });
  const { user } = userStore();
  const ownerId = user?.owner;

  const { courseList, fetchCourseList } = courseStore();

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      let formData = new FormData();
      formData.append("file", data.url[0]);
      let mimeType = data.url[0].type;
      let type = "";

      if (mimeType.startsWith("video/")) {
        type = "video";
      } else if (mimeType === "application/pdf") {
        type = "pdf";
      } else if (
        mimeType === "application/msword" ||
        mimeType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        type = "word";
      } else {
        type = "unknown";
      }
      console.log("file=>>>>",type, data.url[0]);

      await fileUploader(formData);
      const uploadedUrl = fileStore.getState().fileUrl;
      data.url = uploadedUrl;
      data.type = type;
      console.log(data, type);

      let created = await createCourseMaterial({ ...data, institute: ownerId });
      console.log("Response Back=>>>>", created);

      if (created.error) {
        setMessage({ error: true, message: created.error });
      } else {
        setMessage({ error: false, message: created.message });
        reset();
        setPreview("");
      }
      console.log("Form data submitted:", data);
    } catch (error) {
      console.error(error);
      setMessage({ error: true, message: "Something went wrong!" });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {message.message && (
        <CustomToastMsg error={message.error} toastReset={setMessage}>
          {message.message}
        </CustomToastMsg>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="max-w-5xl mx-auto mt-10 border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 py-6">
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Create Course Material
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700"
                >
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Advanced React Development"
                  className="w-full transition-all border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="level"
                  className="text-sm font-medium text-gray-700"
                >
                  Select Module
                </Label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <SelectInp
                      id="course"
                      className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      data={courseList}
                      placeholder="Select Module"
                      value={field.value}
                      valueId={true}
                      onChange={field.onChange}
                      onMouseOver={() => {
                        if (courseList.length < 1) {
                          fetchCourseList({ id: ownerId });
                        }
                      }}
                    />
                  )}
                />
                {errors.level && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Course Description
              </Label>
              <TextArea
                id="description"
                placeholder="Provide a detailed description of what students will learn in this course..."
                rows={5}
                className="w-full border rounded-md border-gray-300 text-sm shadow-sm py-2 px-4 transition-all focus:outline-none
               focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <Label
                htmlFor="icon"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Video / PDF / Image
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                <label
                  htmlFor="url"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Drag and drop your file here or click to browse
                  </span>

                  <Input
                    type="file"
                    id="url"
                    accept="video/*,image/*,.pdf"
                    className="hidden"
                    {...register("url", { required: true })}
                    onChange={(e) => {
                      handleImageChange(e);
                      register("url").onChange(e);
                    }}
                  />
                </label>
              </div>
              {errors.url && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={preview}
                  alt="Image Preview"
                  className="max-h-48 rounded-md border"
                />
              </div>
            )}

            <div className="mt-10 flex items-center justify-end gap-4">
              <Button
                type="button"
                onClick={() => router.push("course-material")}
                variant="outline"
                className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={loader}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-md transition-all"
              >
                {loader ? "Creating Module..." : "Create Module"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default CourseMaterialForm;
