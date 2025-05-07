import { create } from "zustand";
import getCourses from "@/apis/courses";
import getOwnCourses from "@/apis/courses/own-course";
import getSingleCourse from "@/apis/courses/single-course";
import getCategories from "@/apis/courses/categories-fetch";
import getCoursesLists from "@/apis/courses/course-list";
import getSingleModule from "@/apis/courses/get-single-module";
import getCoursesMaterials from "@/apis/courses/get-course-materials";
import getSingleMaterial from "@/apis/courses/get-single-material";

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
  category: CourseListType;
  type: string;
  institute: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoriesType {
  title: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  total?: number;
  limit?: number;
  page?: number;
  pages?: number;
}

interface GetCoursesResponse {
  success: boolean;
  data?: {
    courses?: Course[];
    pagination?: Pagination;
    course?: Course;
    categories?: CategoriesType[];
    category?: CourseListType | CourseListType[] | any;
    courses_items?: CourseMaterial[];
    courseItem?: CourseMaterial;
  };
  error?: string;
}

interface CourseStore {
  singleCourse: Course | null;
  singleModule: CourseListType | null;
  singleMaterial: CourseMaterial | null;
  category: CategoriesType[];
  courseList: CourseListType[];
  courseMaterial: CourseMaterial[] | null;
  courses: Course[];
  courses2: Course[];
  ownCourses: Course[];
  pagination: Pagination | null;
  status: boolean | null;
  status2: boolean;
  error: string | null;
  error2: string | null;
  loader: boolean;
  loader2: boolean;
  fetchAllCourses: (params?: Record<string, any>) => Promise<void>;
  filteredCourse: (params?: Record<string, any>) => Promise<void>;
  fetchOwnCourse: (params?: Record<string, any>) => Promise<void>;
  fetchSingleCourse: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchCourseList: (params?: Record<string, any>) => Promise<void>;
  fetchSingleCourseModule: (id: string) => Promise<void>;
  fetchCourseMaterials: (params?: Record<string, any>) => Promise<void>;
  fetchSingleMaterial: (id: string) => Promise<void>;
}

const courseStore = create<CourseStore>((set) => ({
  singleCourse: null,
  singleModule: null,
  singleMaterial: null,
  category: [],
  courseList: [],
  courseMaterial: [],
  courses: [],
  courses2: [],
  ownCourses: [],
  pagination: null,
  status: null,
  status2: false,
  error: null,
  error2: null,
  loader: false,
  loader2: false,

  filteredCourse: async (params = {}) => {
    set({ loader: true });
    const res: GetCoursesResponse = await getCourses(params);
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

  fetchAllCourses: async (params = {}) => {
    set({ loader2: true });
    const res: GetCoursesResponse = await getCourses(params);
    if (res.success) {
      set({
        courses2: res.data?.courses || [],
        pagination: res.data?.pagination || null,
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

  fetchOwnCourse: async (params = {}) => {
    try {
      set({ loader: true });
      const res: GetCoursesResponse = await getOwnCourses(params);
      if (res.success) {
        set({
          ownCourses: res.data?.courses || [],
          pagination: res.data?.pagination || null,
          loader: false,
          status: true,
          error: null,
        });
      } else {
        set({
          status: false,
          loader: false,
          error: res.error || "Failed to fetch own courses",
        });
      }
    } catch (err: unknown) {
      const error = err as Error;
      set({
        status: false,
        loader: false,
        error: error.message || "Unexpected error while fetching own courses",
      });
    }
  },

  fetchSingleCourse: async (id: string) => {
    try {
      set({ loader: true });
      const res: GetCoursesResponse = await getSingleCourse({ id });
      if (res.success) {
        set({
          singleCourse: res.data?.course || null,
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
    } catch (err: unknown) {
      const error = err as Error;
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
          category: res.data?.category || [],
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
    } catch (err: unknown) {
      const error = err as Error;
      set({
        status: false,
        loader: false,
        error: error.message || "Unexpected error while fetching categories",
      });
    }
  },

  fetchCourseList: async (params = {}) => {
    try {
      set({ loader: true });
      const res: GetCoursesResponse = await getCoursesLists(params);
      if (res.success) {
        set({
          courseList: res.data?.category ? res.data.category : [],
          pagination: res.data?.pagination || null,
          loader: false,
          status: true,
          error: null,
        });
      } else {
        set({
          loader: false,
          status: false,
          error: res.error || "Failed to fetch course list",
        });
      }
    } catch (err: unknown) {
      const error = err as Error;
      set({
        status: false,
        loader: false,
        error: error.message || "Unexpected error while fetching course list",
      });
    }
  },

  fetchSingleCourseModule: async (id: string) => {
    try {
      set({ loader: true });
      const res: GetCoursesResponse = await getSingleModule({ id });
      if (res.success) {
        set({
          singleModule: res.data?.category || null,
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
    } catch (err: unknown) {
      const error = err as Error;
      set({
        status: false,
        loader: false,
        error: error.message || "Unexpected error while fetching module",
      });
    }
  },

  fetchCourseMaterials: async (params = {}) => {
    try {
      set({ loader: true });
      const res: GetCoursesResponse = await getCoursesMaterials(params);
      if (res.success) {
        set({
          courseMaterial: res.data?.courses_items || [],
          pagination: res.data?.pagination || null,
          loader: false,
          status: true,
          error: null,
        });
      } else {
        set({
          status: false,
          loader: false,
          error: res.error || "Failed to fetch course materials",
        });
      }
    } catch (err: unknown) {
      const error = err as Error;
      set({
        status: false,
        loader: false,
        error: error.message || "Unexpected error while fetching materials",
      });
    }
  },

  fetchSingleMaterial: async (id: string) => {
    try {
      set({ loader: true });
      const res: GetCoursesResponse = await getSingleMaterial({ id });
      if (res.success) {
        set({
          singleMaterial: res.data?.courseItem || null,
          loader: false,
          status: true,
          error: null,
        });
      } else {
        set({
          status: false,
          loader: false,
          error: res.error || "Failed to fetch material",
        });
      }
    } catch (err: unknown) {
      const error = err as Error;
      set({
        status: false,
        loader: false,
        error: error.message || "Unexpected error while fetching material",
      });
    }
  },
}));

export default courseStore;
