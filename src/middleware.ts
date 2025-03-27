import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("middleware")

  function checkToken () {
     if (request.cookies.get('auth-token')) {
         return true
     } 
     return false
  }  

  console.log(checkToken())

  const authUrls = ['/login', '/signup']
  if (authUrls.includes(request.nextUrl.pathname) && checkToken()) {
      return NextResponse.redirect(new URL('/', request.url))
  }  
  
  const protectedUrls = ['/account']
  if (protectedUrls.includes(request.nextUrl.pathname) && !checkToken()) {
      return NextResponse.redirect(new URL('/login', request.url))
  }


  // return NextResponse.redirect(new URL('/home', request.url))
}
export const config = {
  matcher: ['/login', '/signup', '/account'],
}