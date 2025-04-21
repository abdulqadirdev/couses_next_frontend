import { Course } from "@/store/courses-store";
import { Award, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

const CourseCard = ({course}: {course:Course}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      key={course._id}
      className="group relative h-full overflow-hidden rounded-2xl transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/90 via-gray-800/95 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 group-hover:border-purple-500/50 transition-all duration-500"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150"></div>

      <div className="relative p-6 flex flex-col h-full z-10">
        {/* Institute Info */}
        <div className="flex items-center mb-3">
          {course.createdBy?.instituteLogo && (
            <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2 border border-gray-600">
              <img
                src={course.createdBy.instituteLogo}
                alt={course.createdBy.instituteName || "Institute"}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <span className="text-xs font-medium text-gray-300 truncate">
            {course.createdBy?.instituteName || "Unknown Institute"}
          </span>
        </div>

        <div className="relative mb-5 overflow-hidden aspect-video bg-gray-900/50 border border-gray-800/50 group-hover:border-purple-500/30 transition-all duration-300 rounded-xl">
          <img
            src={course.image ?? "/placeholder.png"}
            alt={course.title}
            className="object-contain w-full h-full transform group-hover:scale-110 transition-all duration-700"
          />
          {course.featured && (
            <div className="absolute top-3 right-3 z-20 flex items-center space-x-1 px-3 py-1 rounded-full bg-purple-900/70 backdrop-blur-sm border border-purple-700/50">
              <TrendingUp className="w-3 h-3 text-purple-300" />
              <span className="text-xs font-medium text-purple-300">
                Featured
              </span>
            </div>
          )}
          <div className="absolute bottom-3 left-0 z-20 flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-900/70 backdrop-blur-sm border border-gray-700/50">
            <Award className="w-3 h-3 text-gray-300" />
            <span className="text-xs font-medium text-gray-300">
              {course.level}
            </span>
          </div>
        </div>

        <div className="mb-2">
          <span className="inline-flex items-center rounded-full bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-300 border border-purple-800/30">
            {course.category && course.category}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 line-clamp-1">
          {course.title}
        </h3>

        <p className="mb-4 text-sm text-gray-400 line-clamp-2 flex-grow">
          {course.description}
        </p>

        <div className="text-xs text-gray-400 mb-4 flex items-center">
          <Calendar className="w-3 h-3 mr-1 text-purple-400" />
          <span>Created: {formatDate(course.createdAt)}</span>
        </div>

        <Link
          href={`/single-course/${course._id}`}
          className="inline-block text-sm font-medium text-purple-400 hover:text-pink-400 transition duration-300"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
