import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer",
      company: "TechCorp",
      content:
        "The web development bootcamp completely changed my career. I went from knowing nothing about coding to landing a job as a frontend developer within 3 months of completing the course. The projects were challenging but extremely rewarding.",
      image: "/placeholder.svg?height=100&width=100",
      course: "Complete Web Development Bootcamp",
      rating: 5,
    },
    {
      id: 2,
      name: "Lisa Wang",
      role: "Data Analyst",
      company: "FinanceAI",
      content:
        "The data science course was exactly what I needed to transition from traditional analytics to machine learning. The instructor explained complex concepts in an easy-to-understand way, and the hands-on projects gave me real-world experience.",
      image: "/placeholder.svg?height=100&width=100",
      course: "Data Science & Machine Learning Masterclass",
      rating: 5,
    },
    {
      id: 3,
      name: "Mark Johnson",
      role: "Product Designer",
      company: "CreativeStudio",
      content:
        "As someone with no design background, I was amazed at how quickly I was able to create professional-looking designs after taking the UI/UX course. The instructor's feedback was invaluable, and I now have a portfolio that has helped me land multiple freelance gigs.",
      image: "/placeholder.svg?height=100&width=100",
      course: "UI/UX Design Fundamentals",
      rating: 5,
    },
    {
      id: 4,
      name: "Sophia Garcia",
      role: "Mobile Developer",
      company: "AppWorks",
      content:
        "The Flutter course was comprehensive and up-to-date. I appreciated how the instructor covered both the basics and advanced topics. I was able to publish my first app to both app stores before even finishing the course!",
      image: "/placeholder.svg?height=100&width=100",
      course: "Mobile App Development with Flutter",
      rating: 4,
    },
  ];

  return (
    <section id="testimonials" className="w-full py-20 md:py-32 bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-purple-900/50 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur">
            <span className="mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
            Student Success Stories
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            What Our Students Say
          </h2>
          <p className="max-w-[900px] text-gray-400 md:text-lg">
            Hear from students who have transformed their careers with our
            courses.
          </p>
        </div>

        <Swiper spaceBetween={20} slidesPerView={2} className="w-full">
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="h-auto">
              <div className="h-full rounded-xl border border-gray-800 bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-700">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      width={48}
                      height={48}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="mb-4 text-gray-300">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(null)
                      .map((_, j) => (
                        <svg
                          key={j}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={
                            j < testimonial.rating ? "currentColor" : "none"
                          }
                          stroke="currentColor"
                          className={`h-4 w-4 ${
                            j < testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                  </div>
                  <span className="text-sm text-purple-400">
                    {testimonial.course}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
