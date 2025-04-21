"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCards } from "swiper/modules";
import Link from "next/link";
import { MapPin, Phone, Calendar, CheckCircle, Clock } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

interface Institute {
  _id: string;
  instituteName: string;
  instituteAddress: string;
  ownerCnic: string;
  phone: string;
  approvedByAdmin: boolean;
  instituteLogo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const institutes: Institute[] = [
  {
    _id: "67fd96fdb41f823fb951lc26",
    instituteName: "My New Institute 1",
    instituteAddress: "Lorem ipsum hol wrqwiopsd sd sdos sopwkpw qoowmdm..",
    ownerCnic: "12345-6789014-3",
    phone: "1234567891",
    approvedByAdmin: true,
    instituteLogo:
      "https://res.cloudinary.com/dhvtjvx8y/image/upload/v1744659944/Logo-05%20%281%29.png",
    createdBy: "67fda8349c9a614f93288bae",
    createdAt: "2025-04-14T23:15:09.368+00:00",
    updatedAt: "2025-04-16T17:47:53.627+00:00",
    __v: 0,
  },
  {
    _id: "67fd96fdb41f823fb951lc27",
    instituteName: "Digital Learning Academy",
    instituteAddress: "123 Innovation Boulevard, Tech District, Digital City",
    ownerCnic: "12345-6789015-3",
    phone: "1234567892",
    approvedByAdmin: true,
    instituteLogo:
      "https://res.cloudinary.com/dhvtjvx8y/image/upload/v1744659944/Logo-05%20%281%29.png",
    createdBy: "67fda8349c9a614f93288bae",
    createdAt: "2025-04-14T23:15:09.368+00:00",
    updatedAt: "2025-04-16T17:47:53.627+00:00",
    __v: 0,
  },
  {
    _id: "67fd96fdb41f823fb951lc28",
    instituteName: "Future Skills Institute",
    instituteAddress: "456 Knowledge Avenue, Education Park, Learning Heights",
    ownerCnic: "12345-6789016-3",
    phone: "1234567893",
    approvedByAdmin: false,
    instituteLogo:
      "https://res.cloudinary.com/dhvtjvx8y/image/upload/v1744659944/Logo-05%20%281%29.png",
    createdBy: "67fda8349c9a614f93288bae",
    createdAt: "2025-04-14T23:15:09.368+00:00",
    updatedAt: "2025-04-16T17:47:53.627+00:00",
    __v: 0,
  },
  {
    _id: "67fd96fdb41f823fb951lc29",
    instituteName: "Global Tech University",
    instituteAddress: "789 Research Drive, Science Quarter, Innovation City",
    ownerCnic: "12345-6789017-3",
    phone: "1234567894",
    approvedByAdmin: true,
    instituteLogo:
      "https://res.cloudinary.com/dhvtjvx8y/image/upload/v1744659944/Logo-05%20%281%29.png",
    createdBy: "67fda8349c9a614f93288bae",
    createdAt: "2025-04-14T23:15:09.368+00:00",
    updatedAt: "2025-04-16T17:47:53.627+00:00",
    __v: 0,
  },
  {
    _id: "67fd96fdb41f823fb951lc30",
    instituteName: "Creative Arts Academy",
    instituteAddress: "101 Design Street, Arts District, Creative Valley",
    ownerCnic: "12345-6789018-3",
    phone: "1234567895",
    approvedByAdmin: true,
    instituteLogo:
      "https://res.cloudinary.com/dhvtjvx8y/image/upload/v1744659944/Logo-05%20%281%29.png",
    createdBy: "67fda8349c9a614f93288bae",
    createdAt: "2025-04-14T23:15:09.368+00:00",
    updatedAt: "2025-04-16T17:47:53.627+00:00",
    __v: 0,
  },
];

const InstituteCards = () => {
  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-purple-950">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-pink-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-900/30 backdrop-blur-sm border border-purple-800/50">
            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
            <span className="text-sm font-medium text-purple-300">
              Premium Institutes
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 animate-gradient">
              Discover Top Institutes
            </span>
          </h2>

          <p className="max-w-2xl text-gray-300 text-lg md:text-xl opacity-80">
            Explore prestigious educational institutions with cutting-edge
            facilities and expert faculty
          </p>
        </div>

        {/* Institute Cards */}
        <div className="py-8">
          <Swiper
            modules={[Pagination, Autoplay, EffectCards]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {institutes.map((institute) => (
              <SwiperSlide key={institute._id} className="py-4">
                <Link
                  href={`/institutes/${institute._id}`}
                  className="block h-full"
                >
                  <div className="group relative h-full overflow-hidden rounded-2xl transition-all duration-500">
                    {/* Card Background with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/90 via-gray-800/95 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 group-hover:border-purple-500/50 transition-all duration-500"></div>

                    {/* Animated Background Elements */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150"></div>
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150"></div>

                    {/* Card Content */}
                    <div className="relative flex flex-col items-center text-center p-8 h-full z-10">
                      {/* Institute Logo */}
                      <div className="relative mb-6 group-hover:scale-110 transition-all duration-500">
                        <div className="absolute -inset-1 rounded-full border-3 border-purple-600 opacity-75 blur group-hover:opacity-100 group-hover:animate-spin-slow transition-all duration-500"></div>
                        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-2 border-white/10">
                          {institute.instituteLogo ? (
                            <img
                              src={
                                institute.instituteLogo || "/placeholder.svg"
                              }
                              alt={institute.instituteName}
                              className="h-16 w-16 object-contain"
                            />
                          ) : (
                            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                              {institute.instituteName.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Verification Badge */}
                      <div className="absolute top-4 right-4">
                        {institute.approvedByAdmin ? (
                          <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-green-900/30 text-green-400 border border-green-700/30 backdrop-blur-sm">
                            <CheckCircle className="w-3 h-3" />
                            <span className="text-xs font-medium">
                              Verified
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-orange-900/30 text-orange-400 border border-orange-700/30 backdrop-blur-sm">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs font-medium">
                              Unapproved
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Institute Name */}
                      <h3 className="mb-2 text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                        {institute.instituteName}
                      </h3>

                      {/* Institute Address */}
                      <div className="flex items-center justify-center mb-6">
                        <MapPin className="w-4 h-4 text-purple-400 mr-1 flex-shrink-0" />
                        <p className="text-gray-300 text-sm line-clamp-1">
                          {institute.instituteAddress}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4"></div>

                      {/* Institute Details */}
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex flex-col items-center p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 group-hover:border-purple-500/30 transition-all duration-300">
                          <Phone className="w-4 h-4 text-purple-400 mb-1" />
                          <span className="text-xs text-gray-400">Contact</span>
                          <span className="text-sm font-medium text-white">
                            {institute.phone}
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 group-hover:border-purple-500/30 transition-all duration-300">
                          <Calendar className="w-4 h-4 text-purple-400 mb-1" />
                          <span className="text-xs text-gray-400">Since</span>
                          <span className="text-sm font-medium text-white">
                            {formatDate(institute.createdAt).split(",")[0]}
                          </span>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <div className="absolute -bottom-10 group-hover:bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-500 w-full px-6">
                        <div className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium text-center">
                          View Details
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default InstituteCards;
