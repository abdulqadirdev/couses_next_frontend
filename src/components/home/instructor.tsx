import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Instructor = () => {
    
  const instructors = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Web Development Instructor",
      bio: "Full-stack developer with 10+ years of experience. Previously worked at Google and Amazon.",
      image: "./intructor_1.jpg",
      courses: 12,
      students: 25000,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Science Instructor",
      bio: "PhD in Computer Science with specialization in Machine Learning. Former Data Scientist at Netflix.",
      image: "./intructor_2.jpg",
      courses: 8,
      students: 18000,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UI/UX Design Instructor",
      bio: "Award-winning designer with experience at top design agencies. Passionate about creating intuitive user experiences.",
      image: "./intructor_3.jpg",
      courses: 6,
      students: 15000,
      rating: 4.9,
    },
    {
      id: 4,
      name: "David Kim",
      role: "Mobile Development Instructor",
      bio: "Mobile app developer who has published over 20 apps with millions of downloads. Specializes in Flutter and React Native.",
      image: "./intructor_4.jpg",
      courses: 5,
      students: 12000,
      rating: 4.7,
    },
    {
      id: 5,
      name: "James Wilson",
      role: "JavaScript Instructor",
      bio: "JavaScript expert and open source contributor. Author of several programming books and conference speaker.",
      image: "./intructor_5.jpg",
      courses: 10,
      students: 22000,
      rating: 4.8,
    },
  ];

  return (
    <section id="instructors" className="w-full py-20 md:py-32 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-purple-900/50 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur">
            <span className="mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
            Expert Instructors
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Learn From The Best
          </h2>
          <p className="max-w-[900px] text-gray-400 md:text-lg">
            Our instructors are industry professionals with years of real-world
            experience.
          </p>
        </div>
        <div className="py-20">
          <Swiper slidesPerView={3} spaceBetween={20}>
            {instructors.map((instructor) => (
              <SwiperSlide key={instructor.id}>
                <div className="h-[350px] rounded-xl border border-gray-800 bg-gray-800">
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="relative mb-4">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur"></div>
                      <div className="relative h-32 w-32 overflow-hidden rounded-full">
                        <img
                          src={instructor.image}
                          alt={instructor.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="mb-1 text-xl font-bold text-white">
                      {instructor.name}
                    </h3>
                    <p className="mb-3 text-sm text-purple-400">
                      {instructor.role}
                    </p>
                    <p className="mb-4 text-gray-400 text-sm">
                      {instructor.bio}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Instructor;
