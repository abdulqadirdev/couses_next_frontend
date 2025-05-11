import React from "react";

const SkeletonCardSingle = () => {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/30"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-pink-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="animate-pulse mb-8">
          <div className="inline-flex items-center text-gray-400">
            <div className="h-4 w-4 bg-gray-400 rounded-full mr-2"></div>
            <div className="w-24 h-4 bg-gray-400 rounded"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Course Info */}
          <div>
            {/* Category */}
            <div className="inline-flex items-center capitalize rounded-full bg-purple-900/30 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur-sm border border-purple-800/30 mb-4 animate-pulse">
              <div className="h-3 w-3 bg-gray-400 rounded-full mr-2"></div>
              <div className="w-32 h-4 bg-gray-400 rounded"></div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 w-48 h-8 bg-gray-400 rounded animate-pulse"></h1>

            {/* Description */}
            <p className="text-gray-300 mb-6 w-72 h-6 bg-gray-400 rounded animate-pulse"></p>

            {/* Level and Date */}
            <div className="flex flex-wrap items-center gap-4 mb-6 animate-pulse">
              <div className="flex items-center">
                <div className="h-5 w-5 bg-gray-400 rounded mr-2"></div>
                <div className="w-24 h-4 bg-gray-400 rounded"></div>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 bg-gray-400 rounded mr-2"></div>
                <div className="w-32 h-4 bg-gray-400 rounded"></div>
              </div>
            </div>

            {/* Institute Info */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-6 animate-pulse">
              <div className="h-12 w-12 bg-gray-400 rounded-full"></div>
              <div>
                <div className="w-24 h-4 bg-gray-400 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-400 rounded"></div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="transform transition-all duration-700 delay-500 animate-pulse">
              <button className="relative overflow-hidden px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group">
                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-24 h-4 bg-gray-400 rounded"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Course Image */}
          <div className="transform transition-all duration-700 delay-300 animate-pulse">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur"></div>
              <div className="relative rounded-xl overflow-hidden bg-gray-800/80 backdrop-blur-sm border border-gray-700/50">
                <div className="relative aspect-video">
                  <div className="w-full h-full bg-gray-400 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonCardSingle;
