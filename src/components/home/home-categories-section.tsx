import CoursesWithCategories from "./cards/courses-categories";

const CategorySection = () => {
  return (
    <section className="py-24 relative w-full overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-900/30 backdrop-blur-sm border border-purple-800/50">
          <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
          <span className="text-sm font-medium text-purple-300">
            Premium Courses
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 animate-gradient">
            Expand Your Knowledge
          </span>
        </h2>
        <p className="max-w-2xl text-gray-300 text-lg md:text-xl opacity-80">
          Discover expert-led courses designed to help you master new skills and
          advance your career
        </p>
      </div>
      <CoursesWithCategories />
    </section>
  );
};

export default CategorySection;
