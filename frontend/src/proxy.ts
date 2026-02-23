import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export function proxy(request: NextRequest) {
    const token = request.cookies.get("JWT")?.value;
    const { pathname } = request.nextUrl;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    if (!isPublicRoute && !token) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (token && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/problems", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};