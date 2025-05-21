const ButtonSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <button
          key={index}
          className={`relative overflow-hidden rounded-full animate-pulse px-6 py-2.5 text-sm font-medium transition-all bg-gray-600 w-[120px] duration-300
          `}
        ></button>
      ))}
    </>
  );
};

export default ButtonSkeleton;
