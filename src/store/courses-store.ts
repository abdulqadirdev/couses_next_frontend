import { create } from "zustand";
import getCourses from "@/apis/courses";

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
  data?: { courses: Course[] };
  error?: string;
}

interface CourseStore {
  courses: Course[];
  courses2: Course[];
  status: boolean;
  status2: boolean;
  error: string | null;
  error2: string | null;
  loader: boolean;
  loader2: boolean;
  fetchAllCourses: (params: any) => Promise<void>;
  filteredCourse: (params: any) => Promise<void>;
}

const courseStore = create<CourseStore>((set) => ({
  courses: [],
  courses2: [],
  status: false,
  status2: false,
  error: null,
  error2: null,
  loader: false,
  loader2: false,

  fetchAllCourses: async (params) => {
    set({ loader2: true });
    const res: GetCoursesResponse = await getCourses(params);
    if (res.success) {
      set({
        courses2: res.data?.courses || [],
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
}));

export default courseStore;
