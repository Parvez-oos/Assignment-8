import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function proxy(request: NextRequest) {
  

  const sessionResponse = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
    headers: {

      
      cookie: request.headers.get("cookie") || "",
    },
  });

  

  const session = sessionResponse.ok ? await sessionResponse.json() : null;

  const { pathname } = request.nextUrl;
  
  

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  
  const privateRoutes =["/my-profile", "/update-profile", "/tile/"];
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (!session && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher:["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};