import Link from "next/link";

const NoteSection = () => {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-purple-900 to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl text-white">
            Start Your Learning Journey Today
          </h2>
          <p className="max-w-[600px] text-gray-300 md:text-lg">
            Join thousands of students already learning on our platform and take
            the next step in your career.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="#"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-800"
            >
              <span className="relative rounded-md bg-gray-900 px-5 py-2.5 transition-all duration-300 ease-in-out group-hover:bg-opacity-0">
                Sign Up Free
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
              Browse Courses
            </Link>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            No credit card required. 7-day free trial on all plans.
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoteSection;
