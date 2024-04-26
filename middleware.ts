import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/ask-question",
    "/tags",
    "/tags/:id",
    "/profile/:id",
    "/question/:questionId",
    "/community",
    "/jobs",
    "/api/webhooks",
  ],
  ignoredRoutes: ["/api/webhooks", "/api/chatgpt"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
