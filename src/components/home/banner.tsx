import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <section
      id="home"
      className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex w-fit items-center rounded-full bg-purple-900/50 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur">
              <span className="mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
              Transform Your Career With Online Learning
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                Learn Without Limits
              </h1>
              <p className="max-w-[600px] text-gray-300 text-lg md:text-xl">
                Gain in-demand skills from expert instructors. Choose from over
                500 courses in web development, data science, design, marketing,
                and more.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#courses"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-800"
              >
                <span className="relative rounded-md bg-gray-900 px-5 py-2.5 transition-all duration-300 ease-in-out group-hover:bg-opacity-0">
                  Explore Courses
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="ml-1 inline-block h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </Link>

              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700"
              >
                Watch Demo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-2 h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full border-2 border-gray-900 bg-gray-${
                      i * 100 + 300
                    }`}
                  ></div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-yellow-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                </div>
                <span className="text-gray-400">
                  Trusted by 100,000+ students worldwide
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur"></div>
              <div className="relative rounded-lg bg-gray-800 p-1">
                <Image
                  src="/courses-pic.webp"
                  width={600}
                  height={600}
                  alt="Online Learning"
                  className="rounded-lg shadow-2xl"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-90 blur-xl"></div>
              <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 opacity-90 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="text-gray-900"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Banner;
