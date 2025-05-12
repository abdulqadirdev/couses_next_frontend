import resetSlug from "@/helper/reset-slug";
import userStore from "@/store/user-store";
import { Award, Calendar, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

const SingleCourseCard = ({ isLoaded, courseData }: any) => {
  const { user } = userStore();
  const isElgibile = user?.institute?.instituteId;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <section className="relative pt-20 pb-16 overflow-hidden mx-8 rounded-t-2xl">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/30"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-pink-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Course Info */}
          <div>
            <div
              className={`inline-flex items-center capitalize rounded-full bg-purple-900/30 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur-sm border border-purple-800/30 mb-4 transform transition-all duration-700 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Sparkles className="h-3 w-3 mr-2 text-purple-400" />
              {resetSlug(courseData?.category)}
            </div>

            <h1
              className={`text-3xl md:text-4xl font-bold mb-4 transform transition-all duration-700 delay-100 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 animate-gradient">
                {courseData?.title}
              </span>
            </h1>

            <p
              className={`text-gray-300 mb-6 transform transition-all duration-700 delay-200 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {courseData?.description}
            </p>

            <div
              className={`flex flex-wrap items-center gap-4 mb-6 transform transition-all duration-700 delay-300 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center">
                <Award className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-gray-300 capitalize">
                  {courseData?.level}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-gray-300">
                  Publish: {formatDate(courseData?.createdAt)}
                </span>
              </div>
            </div>

            {/* Institute Info */}
            <div
              className={`flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-6 transform transition-all duration-700 delay-400 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative h-12 content-center w-12 rounded-full overflow-hidden border-2 border-purple-500">
                <img
                  src={
                    courseData?.createdBy.instituteLogo || "/placeholder.svg"
                  }
                  alt={courseData?.createdBy.instituteName}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Offered by</p>
                <h3 className="text-white font-medium">
                  {courseData?.createdBy.instituteName}
                </h3>
              </div>
            </div>

            {/* CTA Button */}
            <div
              className={`transform transition-all duration-700 delay-500 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {isElgibile ? (
                <button className="relative overflow-hidden px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group">
                  <span className="relative z-10 flex items-center justify-center">
                    Enroll Now
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute -inset-x-full bottom-0 h-px w-[200%] bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></span>
                </button>
              ) : (
                <Link
                  href={isElgibile || "#"}
                  className="relative inline-block overflow-hidden px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Enroll Now
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute -inset-x-full bottom-0 h-px w-[200%] bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></span>
                </Link>
              )}
            </div>
          </div>

          {/* Course Image */}
          <div
            className={`transform transition-all duration-700 delay-300 ${
              isLoaded
                ? "translate-y-0 opacity-100 rotate-0"
                : "translate-y-10 opacity-0 rotate-3"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur"></div>
              <div className="relative rounded-xl overflow-hidden bg-gray-800/80 backdrop-blur-sm border border-gray-700/50">
                <div className="relative aspect-video">
                  <img
                    src={courseData?.image || "/placeholder.svg"}
                    alt={courseData?.title}
                    className="object-contain p-4 h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleCourseCard;
