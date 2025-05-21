import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import checkToken from "@/helper/get-token";
import { getSingleUser } from "./apis/user/single-user-get";

export async function middleware(request: NextRequest) {
  const { cookies } = request;
  const user = await getSingleUser();
  console.log(!user?.data?.user.owner);

  const authUrls = ["/login", "/signup"];
  if (authUrls.includes(request.nextUrl.pathname) && checkToken(cookies)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const protectedUrls = ["/dashboard", "institute-dashboard"];
  const isProtected = request.nextUrl.pathname.split("/")[1];
  console.log(isProtected,    protectedUrls.includes(isProtected));
  
  if (
    protectedUrls.includes(isProtected) &&
    !checkToken(cookies) &&
    !user?.data?.user?.owner
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
