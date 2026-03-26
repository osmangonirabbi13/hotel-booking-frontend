import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "@/lib/authUtils";
import { jwtUtils } from "@/lib/jwtUtils";
import { isTokenExpiringSoon } from "@/lib/tokenUtils";
import {
  getNewTokensWithRefreshToken,
  getUserInfo,
} from "@/services/auth.service";
import { NextRequest, NextResponse } from "next/server";

async function refreshTokenMiddleware(
  refreshToken: string,
): Promise<boolean> {
  try {
    const refresh = await getNewTokensWithRefreshToken(refreshToken);
    return !!refresh;
  } catch (error) {
    console.error("Error refreshing token in middleware:", error);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const verifiedAccessToken = accessToken
      ? jwtUtils.verifyToken(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string,
        )
      : null;

    const isValidAccessToken = verifiedAccessToken?.success === true;

    const decodedAccessToken =
      verifiedAccessToken && verifiedAccessToken.success
        ? verifiedAccessToken.data
        : null;

    let userRole: UserRole | null = null;

    if (decodedAccessToken?.role) {
      userRole = decodedAccessToken.role as UserRole;
    }

    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    

    if (
      isValidAccessToken &&
      accessToken &&
      refreshToken &&
      (await isTokenExpiringSoon(accessToken))
    ) {
      const requestHeaders = new Headers(request.headers);

      try {
        const refreshed = await refreshTokenMiddleware(refreshToken);

        if (refreshed) {
          requestHeaders.set("x-token-refreshed", "1");
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    if (isAuth && isValidAccessToken && userRole) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url),
      );
    }

    if (pathname === "/reset-password") {
      const email = request.nextUrl.searchParams.get("email");

      if (accessToken && email) {
        const userInfo = await getUserInfo();

        if (userInfo.needPasswordChange) {
          return NextResponse.next();
        }

        if (userRole) {
          return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole), request.url),
          );
        }
      }

      if (email) {
        return NextResponse.next();
      }

      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (routeOwner === null) {
      return NextResponse.next();
    }

    if (!accessToken || !isValidAccessToken || !userRole) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userInfo = await getUserInfo();

    if (userInfo) {
      if (userInfo.emailVerified === false) {
        if (pathname !== "/verify-email") {
          const verifyEmailUrl = new URL("/verify-email", request.url);
          verifyEmailUrl.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(verifyEmailUrl);
        }

        return NextResponse.next();
      }

      if (userInfo.emailVerified && pathname === "/verify-email") {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole), request.url),
        );
      }

      if (userInfo.needPasswordChange) {
        if (pathname !== "/reset-password") {
          const resetPasswordUrl = new URL("/reset-password", request.url);
          resetPasswordUrl.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(resetPasswordUrl);
        }

        return NextResponse.next();
      }

      if (!userInfo.needPasswordChange && pathname === "/reset-password") {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole), request.url),
        );
      }
    }

    if (routeOwner === "COMMON") {
      return NextResponse.next();
    }

    if (routeOwner !== userRole) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url),
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in proxy middleware:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};