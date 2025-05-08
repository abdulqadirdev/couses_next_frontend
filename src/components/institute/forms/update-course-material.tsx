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
import updateCourseMaterial from "@/apis/courses/update-course-material";
import pdfImg from "@/assets/images/pdf.png";
import wordImg from "@/assets/images/word.jpeg";
import Link from "next/link";
import Image from "next/image";

const CourseMaterialFormUpdate = ({ courseId }: { courseId: string }) => {
  const { fetchSingleMaterial, singleMaterial } = courseStore();
  console.log(singleMaterial);

  const { fileUploader, fileloader } = fileStore();
  const router = useRouter();

  const [preview, setPreview] = useState<string | null | undefined>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      url: "",
      description: "",
    },
  });

  useEffect(() => {
    fetchSingleMaterial(courseId);
  }, [courseId]);

  useEffect(() => {
    if (singleMaterial) {
      reset({
        title: singleMaterial.title,
        url: singleMaterial.url ?? undefined,
        description: singleMaterial.description,
      });
      console.log(singleMaterial.url);

      setPreview(singleMaterial.url);
      setType(singleMaterial.type);
    }
  }, [singleMaterial, reset]);

  interface Message {
    error: boolean;
    message: string;
  }

  const [message, setMessage] = useState<Message>({
    error: false,
    message: "",
  });

  const checkType = (mimeType: any) => {
    if (mimeType.startsWith("video/")) {
      return "video";
    } else if (mimeType === "application/pdf") {
      return "pdf";
    } else if (
      mimeType === "application/msword" ||
      mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return "word";
    } else {
      return "unknown";
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (data.url instanceof FileList) {
        const formData = new FormData();
        formData.append("file", data.url[0]);
        await fileUploader(formData);
        data.url = fileStore.getState().fileUrl || preview;
      } else {
        data.url = preview;
      }

      data.type = type;
      setLoader(true);

      const updated = await updateCourseMaterial({ id: courseId, data });
      console.log(updated.error, updated);

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
    setType(checkType(file?.type));
    alert(checkType(file?.type));
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

      {(fileloader || loader) && (
        <div className="fixed top-0 left-0 z-50 h-[100vh] w-full bg-white/50 backdrop-blur-sm flex flex-col justify-center items-center space-y-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white text-sm font-medium animate-pulse">
            {fileloader ? `Uploading ${type}...` : "Updating Document..."}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="max-w-5xl mx-auto mt-10 border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 py-6">
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Update Course Material
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
              <div className="space-y-2">
                <Label htmlFor="module">Course Module</Label>
                <Input
                  id="module"
                  placeholder="e.g. Advanced React Development"
                  readOnly
                  defaultValue={singleMaterial?.category.title}
                  disabled
                />
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
                    {...register("url")}
                    onChange={(e) => {
                      handleImageChange(e);
                      register("url").onChange(e);
                    }}
                  />
                </label>
              </div>
              {errors.url && (
                <span className="text-sm text-red-500">
                  {errors.url.message}
                </span>
              )}
            </div>
            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                {type === "image" ? (
                  <img
                    src={preview}
                    alt="File Preview"
                    className="max-h-48 rounded-md border"
                  />
                ) : type === "video" ? (
                  <video
                    src={preview}
                    className="max-h-48 rounded-md border"
                    controls
                    muted
                  ></video>
                ) : null}

                {(type === "pdf" || type === "word") && (
                  <Link
                    href={preview}
                    target="_blank"
                    className="inline-block max-w-56"
                  >
                    <Image
                      src={type === "pdf" ? pdfImg : wordImg}
                      alt="File Preview"
                      className="max-h-48 max-w-56 rounded-md border"
                    />
                  </Link>
                )}
              </div>
            )}

            <div className="mt-10 flex items-center justify-end gap-4">
              <Button
                type="button"
                onClick={() =>
                  router.push("/institute-dashboard/courses/course-material")
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

export default CourseMaterialFormUpdate;
