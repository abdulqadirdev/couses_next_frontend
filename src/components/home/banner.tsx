"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Star, ArrowRight } from "lucide-react";

const Banner = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  // Animation on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle video modal
  const [showVideo, setShowVideo] = useState(false);

  const openVideo = () => {
    setShowVideo(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideo = () => {
    setShowVideo(false);
    document.body.style.overflow = "auto";
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-gray-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Main Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900"></div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-r from-purple-700/20 to-pink-600/20 rounded-full blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-700/20 to-cyan-600/20 rounded-full blur-3xl opacity-30 animate-float-slow-reverse"></div>

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiM0NDQ0NTUiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwaDYwVjBoLTYweiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center lg:items-start md:items-center md:text-center lg:text-start space-y-8">
            <div
              className={`inline-flex w-fit items-center rounded-full bg-purple-900/50 px-4 py-2 text-sm font-medium text-purple-300 backdrop-blur-sm border border-purple-800/30 transform transition-all duration-1000 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <span className="mr-2 h-2 w-2 rounded-full bg-purple-400 animate-pulse"></span>
              Transform Your Career With Online Learning
            </div>

            <div className="space-y-6">
              <h1
                className={`text-5xl font-bold tracking-tight   xl:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 animate-gradient transform transition-all duration-1000 delay-300 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                Learn Without{" "}
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 animate-gradient">
                  Limits
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
                </span>
              </h1>

              <p
                className={`max-w-[600px] text-gray-300 text-lg md:text-xl transform transition-all duration-1000 delay-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                Gain in-demand skills from expert instructors. Choose from over
                500 courses in web development, data science, design, marketing,
                and more.
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-700 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Link
                href="#courses"
                className="group relative flex items-center overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 text-base font-medium text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
              >
                <span>Explore Courses</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                onClick={openVideo}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-gray-600 bg-gray-800/50 backdrop-blur-sm px-6 py-3 text-base font-medium text-white hover:bg-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-3.5 w-3.5 text-white fill-white" />
                </span>
                Watch Demo
              </button>
            </div>

            <div
              className={`flex items-center gap-6 transform transition-all duration-1000 delay-900 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-gray-900 overflow-hidden"
                  >
                    <Image
                      src={`/intructor_1.jpg`}
                      width={40}
                      height={40}
                      alt={`User ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                </div>
                <span className="text-gray-400 text-sm">
                  Trusted by{" "}
                  <span className="text-white font-medium">100,000+</span>{" "}
                  students worldwide
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            className={`flex items-center justify-center transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100 rotate-0"
                : "translate-y-10 opacity-0 rotate-3"
            }`}
          >
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 blur-3xl animate-pulse-slow"></div>
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur"></div>

              {/* Main Image Container */}
              <div className="relative rounded-2xl bg-gray-800/80 backdrop-blur-sm p-2 shadow-2xl">
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src="/courses-pic.webp"
                    width={600}
                    height={600}
                    alt="Online Learning"
                    className="rounded-xl shadow-2xl"
                    priority
                  />

                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-lg p-3 shadow-xl animate-float">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          Certificate
                        </div>
                        <div className="text-xs text-gray-300">
                          Accredited Courses
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md rounded-lg p-3 shadow-xl animate-float-delay">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          Flexible Learning
                        </div>
                        <div className="text-xs text-gray-300">
                          Learn at your own pace
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Blurs */}
              <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 blur-2xl"></div>
              <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 opacity-50 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="text-gray-900 w-full"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeVideo}
        >
          <div
            ref={videoRef}
            className="relative w-full max-w-4xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Banner;
