import { create } from "zustand";
import getCourses from "@/apis/courses";
import getOwnCourses from "@/apis/courses/own-course";

export interface Course {
  _id: string;
  title: string;
  description: string;
  image: string | null;
  level: string;
  category: string;
  createdBy: { instituteName: string; instituteLogo: string };
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface GetCoursesResponse {
  success: boolean;
  data?: { courses: Course[]; pagination: any };
  error?: string;
}

interface CourseStore {
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
}

const courseStore = create<CourseStore>((set) => ({
  courses: [],
  courses2: [],
  ownCourses: [],
  pagination: {},
  status: null,
  status2: false,
  error: null,
  error2: null,
  loader: false,
  loader2: false,

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
}));

export default courseStore;
