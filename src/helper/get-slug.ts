const getSlug = (title: string) => {
  return title.split(" ").join("-").toLowerCase();
};

export default getSlug;
