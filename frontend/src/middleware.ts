import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (!request.nextUrl.pathname.startsWith("/sign-in")) {
    if (!request.cookies.has("accessToken")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  } else {
  }
}
