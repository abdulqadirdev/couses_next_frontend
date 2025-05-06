import { create } from "zustand";
import getCourses from "@/apis/courses";
import getOwnCourses from "@/apis/courses/own-course";
import getSingleCourse from "@/apis/courses/single-course";
import getCategories from "@/apis/courses/categories-fetch";
import getCoursesLists from "@/apis/courses/course-list";
import getSingleModule from "@/apis/courses/get-single-module";
import getCoursesMaterials from "@/apis/courses/get-course-materials";

export interface Course {
  _id: string;
  title: string;
  description: string;
  image: string | null | undefined;
  level: string;
  category: string;
  createdBy: { instituteName: string; instituteLogo: string };
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CourseListType {
  _id: string;
  title: string;
  icon: string;
  description: string;
  course: string;
  institute: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseMaterial {
  _id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  institute: string;
  createdAt: string;
  updatedAt: string;
}

interface GetCoursesResponse {
  success: boolean;
  data?: {
    courses: Course[];
    pagination: any;
    course: Course;
    categories: { title: string };
    category: CourseListType;
    courses_items: CourseMaterial;
  };
  error?: string;
}

interface CategoriesType {
  title: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseStore {
  singleCourse: Course | null;
  singleModule: CourseListType | null;
  category: CategoriesType[];
  courseList: CourseListType[];
  courseMaterial: CourseMaterial[] | null;
  courses: Course[];
  courses2: Course[];
  ownCourses: Course[];
  pagination: any;
  status: boolean | null;
  status2: boolean;
  error: string | null;
  error2: string | null;
  loader: boolean;
  loader2: boolean;
  fetchAllCourses: (params: any) => Promise<void>;
  filteredCourse: (params: any) => Promise<void>;
  fetchOwnCourse: (params: any) => Promise<void>;

  fetchSingleCourse: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchCourseList: (params: any) => Promise<void>;
  fetchSingleCourseModule: (params: any) => Promise<void>;
  fetchCourseMaterials: (params: any) => Promise<void>;
}

const courseStore = create<CourseStore>((set) => ({
  courses: [],
  courses2: [],
  courseList: [],
  singleModule: null,
  courseMaterial: [],
  category: [],
  ownCourses: [],
  pagination: {},
  status: null,
  status2: false,
  error: null,
  error2: null,
  loader: false,
  loader2: false,
  singleCourse: null,

  filteredCourse: async (params) => {
    set({ loader: true });
    const res: GetCoursesResponse = await getCourses(params ? params : {});
    if (res.success) {
      set({
        courses: res.data?.courses || [],
        status: true,
        loader: false,
        error: null,
      });
    } else {
      set({
        status: false,
        loader: false,
        error: res.error || "Failed to fetch courses",
      });
    }
  },

  fetchAllCourses: async (params) => {
    set({ loader2: true });
    console.log(params);

    const res: GetCoursesResponse = await getCourses(params);
    console.log("response=>>", res);

    if (res.success) {
      set({
        courses2: res.data?.courses || [],
        pagination: res.data?.pagination,
        status2: true,
        loader2: false,
        error2: null,
      });
    } else {
      set({
        status2: false,
        loader2: false,
        error2: res.error || "Failed to fetch courses",
      });
    }
  },

  fetchOwnCourse: async (params) => {
    try {
      set({ loader: true });
      const res: GetCoursesResponse = await getOwnCourses(params);
      console.log("own-course", res);
      if (res.success) {
        set({
          ownCourses: res.data?.courses,
          pagination: res.data?.pagination,
          loader: false,
          status: true,
          error: null,
        });
      } else {
        set({
          status: false,
          loader: false,
          error: res.error || "Failed to fetch courses",
        });
      }
    } catch (err: any) {
      console.error(err);
      set({
        status: false,
        loader: false,
        error: err.message || "Unexpected error while fetching courses",
      });
    }
  },

  fetchSingleCourse: async (id) => {
    try {
      console.log(id);

      set({ loader: true });
      const res: GetCoursesResponse = await getSingleCourse({id});
      console.log(res);

      if (res.success) {
        set({
          singleCourse: res.data?.course,
          loader: false,
          status: true,
          error: null,
        });
      } else {
        set({
          status: false,
          loader: false,
          error: res.error || "Failed to fetch course",
        });
      }
    } catch (error: any) {
      console.error(error);
      set({
        status: false,
        loader: false,
        error: error.message || "Unexpected error while fetching course",
      });
    }
  },

  fetchCategories: async () => {
    try {
      set({ loader: true });
      const res: GetCoursesResponse = await getCategories();
      console.log(res);

      if (res.success) {
        set({
          category: res.data?.category,
          loader: false,
          status: true,
          error: null,
        });
      } else {
        set({
          status: false,
          loader: false,
          error: res.error || "Failed to fetch categories",
        });
      }
    } catch (error: any) {
      console.error(error);
      set({
        status: false,
        loader: false,
        error: error.message || "Unexpected error while fetching categories",
      });
    }
  },

  fetchCourseList: async (params) => {
    try {
      set({ loader: true });

      const res = await getCoursesLists(params);
      console.log(res);

      if (res.success) {
        set({
          courseList: res.data?.category,
          pagination: res.data?.pagination,
          loader: false,
          status: true,
          error: null,
        });
      } else {
        set({
          loader: false,
          status: false,
          error: res.error || "Failed to fetch courses list",
        });
      }
    } catch (error: any) {
      set({
        status: false,
        loader: false,
        error: error.message || "Unexpected error while fetching courses list",
      });
    }
  },

  fetchSingleCourseModule: async (id) => {
    try {
      console.log(id);

      set({ loader: true });
      const res: GetCoursesResponse = await getSingleModule({ id });
      console.log(res);

      if (res.success) {
        set({
          singleModule: res.data?.category,
          loader: false,
          status: true,
          error: null,
        });
      } else {
        set({
          status: false,
          loader: false,
          error: res.error || "Failed to fetch module",
        });
      }
    } catch (error: any) {
      console.error(error);
      set({
        status: false,
        loader: false,
        error: error.message || "Unexpected error while fetching module",
      });
    }
  },


  fetchCourseMaterials: async (params) => {
    try {
      console.log(params);

      set({ loader: true });
      const res: GetCoursesResponse = await getCoursesMaterials(params);
      console.log(res);

      if (res.success) {
        set({
          courseMaterial: res.data?.courses_items,
          pagination: res.data?.pagination,
          loader: false,
          status: true,
          error: null,
        });
      } else {
        set({
          status: false,
          loader: false,
          error: res.error || "Failed to fetch module",
        });
      }
    } catch (error: any) {
      console.error(error);
      set({
        status: false,
        loader: false,
        error: error.message || "Unexpected error while fetching module",
      });
    }
  },
}));

export default courseStore;
