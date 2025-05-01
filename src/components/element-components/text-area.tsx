const TextArea = (props: any) => {
  return (
    <textarea
      {...props}
      className="col-span-3 resize-none border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none"
    />
  );
};

export default TextArea