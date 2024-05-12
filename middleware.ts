import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/community",
    "/jobs",
    "/question/:questionId",
    "/tags",
    "/tags/:tagId",
    "/assets/icons/hamburger.svg",
    "/assets/icons/account.svg",
  ],
  ignoredRoutes: ["/api/webhook"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
