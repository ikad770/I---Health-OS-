export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/profile/:path*", "/medications/:path*", "/supplements/:path*", "/routines/:path*", "/metrics/:path*", "/documents/:path*", "/settings/:path*"]
};
