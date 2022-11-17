import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (!request.nextUrl.pathname.startsWith("/sign-in")) {
  } else {
  }
}
