"use client";
import { Upload, BookOpen, Clock } from "lucide-react";
import TextArea from "../element-components/text-area";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SelectInp } from "../element-components/select-inp";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { fileStore } from "@/store/file-upload";
import createCourse from "@/apis/courses/create-course";
import { useState } from "react";
import CustomToastMsg from "../toast-message";

const CourseForm = () => {
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
  const { fileUploader, loader } = fileStore();
  const [message, setMessage] = useState<Message>({
    error: false,
    message: "",
  });
  const [preview, setPreview] = useState<string | null>(null); // State for preview

  const levelData = [
    { title: "Beginner" },
    { title: "Intermediate" },
    { title: "Advanced" },
  ];
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      let formData = new FormData();
      formData.append("file", data.image[0]);

      await fileUploader(formData);
      const uploadedUrl = fileStore.getState().fileUrl;
      data.image = uploadedUrl;

      let created = await createCourse(data);
      if (created.error) {
        setMessage({ error: true, message: created.error });
      } else {
        setMessage({ error: false, message: created.message });
        reset();
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
              Create New Course
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700"
                >
                  Course Title
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
                  Difficulty Level
                </Label>
                <Controller
                  name="level"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <SelectInp
                      id="level"
                      className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      data={levelData}
                      value={field.value}
                      onChange={field.onChange}
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
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Course Thumbnail
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Drag and drop your image here or click to browse
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    PNG, JPG or WEBP (max. 2MB)
                  </span>
                  <Input
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    {...register("image", { required: true })}
                    onChange={(e) => {
                      handleImageChange(e);
                      register("image").onChange(e);
                    }}
                  />
                </label>
              </div>
              {errors.image && (
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

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  Featured
                </Label>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center">
                    <Input
                      type="radio"
                      id="featured-yes"
                      value="true"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      {...register("featured", { required: true })}
                    />
                    <Label
                      htmlFor="featured-yes"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Input
                      type="radio"
                      id="featured-no"
                      value="false"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      {...register("featured", { required: true })}
                    />
                    <Label
                      htmlFor="featured-no"
                      className="ml-2 text-sm text-gray-700"
                    >
                      No
                    </Label>
                  </div>
                </div>
                {errors.featured && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-700"
                >
                  Category
                </Label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <SelectInp
                      id="category"
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      data={[
                        { title: "Web Development" },
                        { title: "Mobile Development" },
                        { title: "Data Science" },
                        { title: "Design" },
                        { title: "Business" },
                        { title: "Marketing" },
                      ]}
                    />
                  )}
                />
                {errors.category && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-end gap-4">
              <Button
                type="button"
                onClick={() => router.push("manage-course")}
                variant="outline"
                className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loader}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-md transition-all"
              >
                {loader ? "Creating Course..." : "Create Course"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default CourseForm;
