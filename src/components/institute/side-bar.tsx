"use client";
import {
  BookCopyIcon,
  Boxes,
  Files,
  FileBarChart,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import userStore from "@/store/user-store";

import { useEffect } from "react";
import courseStore from "@/store/courses-store";

const items = [
  {
    title: "Dashboard",
    url: "/institute-dashboard/dashboard",
    icon: LayoutDashboard,
  },
  { title: "Courses", url: "/institute-dashboard/courses", icon: BookCopyIcon },
  { title: "Categories", url: "#", icon: Boxes },
  { title: "Course Materials", url: "#", icon: Files },
  { title: "Student Applications", url: "#", icon: FileBarChart },
  { title: "Logout", url: "#", icon: LogOut },
];

export function AppSidebar() {
  const path = usePathname();
  const { logOutFunc, fetchUser } = userStore();
  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <Sidebar className="w-64 h-[100vh] fixed left-0 top-0 ">
      <div className="bg-gradient-to-b from-[#2E1A47] to-[#3B1D5C] shadow-xl h-screen">
        <SidebarContent className="flex flex-col h-full text-white">
          <div className="p-6 border-b border-white/10 flex items-center gap-4">
            <img
              src="https://res.cloudinary.com/dhvtjvx8y/image/upload/v1744659944/Logo-05%20%281%29.png"
              alt="Institute Logo"
              className="h-10 object-contain"
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
                          onClick={() => logOutFunc()}
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
                        <a
                          href={item.url}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-white/10 text-white font-medium"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="truncate">{item.title}</span>
                        </a>
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
