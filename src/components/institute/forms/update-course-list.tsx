"use client";
import { Upload, BookOpen, Clock } from "lucide-react";
import TextArea from "../../element-components/text-area";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { fileStore } from "@/store/file-upload";
import { useEffect, useState } from "react";
import CustomToastMsg from "../../toast-message";
import courseStore from "@/store/courses-store";
import updateCourseModule from "@/apis/courses/update-course-list";

const CourseModuleForm = ({ courseId }: { courseId: string }) => {
  const { fetchSingleCourseModule, singleModule, fetchCategories, category } =
    courseStore();

  const { fileUploader, fileUrl } = fileStore();
  const router = useRouter();

  const [preview, setPreview] = useState<string | null | undefined>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      icon: "",
      description: "",
    },
  });

  useEffect(() => {
    fetchSingleCourseModule(courseId);
  }, [courseId]);

  useEffect(() => {
    if (singleModule) {
      reset({
        title: singleModule.title,
        icon: singleModule.icon ?? undefined,
        description: singleModule.description,
      });

      setPreview(singleModule.icon);
    }
  }, [singleModule, reset]);
  interface Message {
    error: boolean;
    message: string;
  }

  const [message, setMessage] = useState<Message>({
    error: false,
    message: "",
  });

  const onSubmit = async (data: any) => {
    setLoader(true);
    try {
      if (data.icon instanceof FileList) {
        const formData = new FormData();
        formData.append("file", data.icon[0]);
        await fileUploader(formData);
        data.icon = fileStore.getState().fileUrl || preview;
      } else {
        data.icon = preview;
      }

      const updated = await updateCourseModule({ id: courseId, data });

      if (updated.error) {
        setMessage({ error: true, message: updated.error });
      } else {
        setMessage({ error: false, message: updated.message });
        reset(data);
      }
      setLoader(false);
    } catch (error) {
      console.error(error);
      setMessage({ error: true, message: "Something went wrong!" });
    } finally {
      setLoader(false);
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

      {loader && (
        <div className="fixed top-0 left-0 z-20 h-screen w-full bg-white/10 flex justify-center items-center">
          <span className="loader-2"></span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="max-w-5xl mx-auto mt-10 border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 py-6">
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Update Course Module
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Advanced React Development"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <span className="text-sm text-red-500">
                    {errors.title.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <TextArea
                id="description"
                className="w-full border rounded-md border-gray-300 text-sm shadow-sm py-2 px-4 transition-all focus:outline-none
               focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                rows={5}
                {...register("description", {
                  required: "description is required",
                })}
              />
              {errors.description && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="icon">Course Thumbnail</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500">
                <label
                  htmlFor="icon"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Drag and drop or click to browse
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    PNG, JPG or WEBP (max. 2MB)
                  </span>
                  <Input
                    type="file"
                    id="icon"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    {...register("icon")}
                    onChange={(e) => {
                      handleImageChange(e);
                      register("icon").onChange(e);
                    }}
                  />
                </label>
              </div>
              {errors.icon && (
                <span className="text-sm text-red-500">
                  {errors.icon.message}
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
                onClick={() =>
                  router.push("/institute-dashboard/courses/course-list")
                }
                variant="outline"
              >
                Back
              </Button>
              <Button
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-md transition-all"
                type="submit"
                disabled={!isDirty || loader}
              >
                {loader ? "Updating Course..." : "Update Course"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default CourseModuleForm;
