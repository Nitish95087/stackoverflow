import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhooks",
    "/tags",
    "/tags/:id",
    "/profile/:id",
    "/question/:questionId",
    "/community",
    "/jobs",
  ],
  ignoredRoutes: ["/api/webhooks", "/api/chatgpt"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
