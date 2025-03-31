const Stats = () => {
  interface Stat {
    label: string;
    value: string;
  }

  const stats: Stat[] = [
    { label: "Courses", value: "500+" },
    { label: "Students", value: "100,000+" },
    { label: "Instructors", value: "50+" },
    { label: "Satisfaction", value: "97%" },
  ];

  return (
    <section id="stats" className="w-full py-12 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-6 text-center"
            >
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
