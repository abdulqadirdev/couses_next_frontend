const Skeleton = ({ number = 4 }: { number?: number }) => {
  return (
    <>
      {Array.from({ length: number }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm p-4 animate-pulse"
        >
          <div className="h-48 w-full bg-gray-700/50 rounded-xl mb-4"></div>
          <div className="h-4 w-1/4 bg-gray-700/50 rounded mb-2"></div>
          <div className="h-6 w-3/4 bg-gray-700/50 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-700/50 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-700/50 rounded mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-6 w-1/4 bg-gray-700/50 rounded"></div>
            <div className="h-8 w-1/4 bg-gray-700/50 rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Skeleton;
