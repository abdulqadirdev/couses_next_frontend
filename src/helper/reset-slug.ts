const resetSlug = (title: string) => {
  let convertSlug = title.split("-").join(" ");
  return (
    convertSlug.slice(0, 1).toUpperCase() + convertSlug.slice(1).toLowerCase()
  );
};

export default resetSlug;
