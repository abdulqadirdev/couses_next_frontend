"use client";
import {
  BookCopyIcon,
  Boxes,
  Files,
  FileBarChart,
  LayoutDashboard,
  LogOut,
  Users2,
  School2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import userStore from "@/store/user-store";
import nextLogo from "@/assets/images/next.svg";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/institute-dashboard/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Your Account",
    url: "/institute-dashboard/your-account",
    icon: School2,
  },
  {
    title: "Courses",
    url: "/institute-dashboard/courses/manage-course",
    icon: BookCopyIcon,
  },
  {
    title: "Course Lists",
    url: "/institute-dashboard/courses/course-list",
    icon: Boxes,
  },
  {
    title: "Course Materials",
    url: "/institute-dashboard/courses/course-material",
    icon: Files,
  },
  {
    title: "Student Applications",
    url: "/institute-dashboard/applications/student-applications",
    icon: FileBarChart,
  },
  { title: "Logout", url: "#", icon: LogOut },
];

export function AppSidebar() {
  const path = usePathname();
  const { logOutFunc, fetchUser } = userStore();
  const router = useRouter();
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Sidebar className="w-64 h-[100vh] fixed left-0 top-0 ">
      <div className="bg-gradient-to-r from-purple-800 to-indigo-800 shadow-xl h-screen">
        <SidebarContent className="flex flex-col h-full text-white">
          <div className="p-6 border-b border-white/10 flex items-center gap-4">
            <Image
              src={nextLogo}
              alt="Institute Logo"
              className="h-15 w-15 object-contain"
            />
            <h2 className="text-xl font-semibold tracking-wide">
              My Institute
            </h2>
          </div>

          {/* Menu Items */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = path === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      {item.title === "Logout" ? (
                        <button
                          onClick={() => {
                            logOutFunc();
                            router.push("/");
                          }}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full ${
                            isActive
                              ? "bg-white/10 text-white font-medium"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="truncate">{item.title}</span>
                        </button>
                      ) : (
                        <Link
                          href={item.url}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-white text-black font-medium"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="truncate">{item.title}</span>
                        </Link>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Footer */}
          <div className="mt-auto p-4 text-xs text-white/50 border-t border-white/10">
            © 2025 Edu Master
          </div>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
