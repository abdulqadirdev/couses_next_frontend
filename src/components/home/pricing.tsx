import Link from "next/link";

const PricingSection = () => {

  const pricingDetails = [
    {
      title: "Basic",
      price: "$9.99",
      period: "per month",
      description: "Perfect for beginners looking to explore our platform.",
      features: [
        "Access to 50+ courses",
        "Basic course materials",
        "Course completion certificates",
        "24/7 support",
        "7-day money-back guarantee",
      ],
      popular: false,
      cta: "Get Started",
    },
    {
      title: "Pro",
      price: "$19.99",
      period: "per month",
      description: "Ideal for serious learners who want to master new skills.",
      features: [
        "Access to all 500+ courses",
        "Premium course materials",
        "Course completion certificates",
        "Downloadable resources",
        "Priority support",
        "30-day money-back guarantee",
        "Access to live Q&A sessions",
      ],
      popular: true,
      cta: "Get Started",
    },
    {
      title: "Teams",
      price: "$49.99",
      period: "per month",
      description: "For organizations looking to upskill their employees.",
      features: [
        "Everything in Pro plan",
        "Up to 10 team members",
        "Team progress tracking",
        "Custom learning paths",
        "Dedicated account manager",
        "Team analytics dashboard",
        "Bulk enrollment discounts",
      ],
      popular: false,
      cta: "Contact Sales",
    },
  ];
  
  return (
    <section id="pricing" className="w-full py-20 md:py-32 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-purple-900/50 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur">
            <span className="mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
            Membership Plans
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Choose Your Learning Path
          </h2>
          <p className="max-w-[900px] text-gray-400 md:text-lg">
            Get unlimited access to our courses with our flexible membership
            plans.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {pricingDetails.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-xl ${
                plan.popular
                  ? "border-2 border-purple-500"
                  : "border border-gray-700"
              } bg-gray-900 overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="h-20 w-20 bg-purple-600 rotate-45 transform translate-x-8 -translate-y-8 flex items-end justify-center">
                    <span className="text-xs font-medium text-white mb-2 -rotate-45">
                      POPULAR
                    </span>
                  </div>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.title}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-purple-400 mt-0.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#"
                  className={`block w-full rounded-md ${
                    plan.popular
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                  } px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-gray-700 bg-gray-900 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Need a custom plan for your organization?
              </h3>
              <p className="text-gray-400">
                Contact our sales team to discuss your specific requirements and
                get a tailored quote.
              </p>
            </div>
            <Link
              href="#"
              className="rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 whitespace-nowrap"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PricingSection;
