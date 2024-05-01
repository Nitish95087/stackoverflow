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
    "/api/webhook",
    "/assets/images/site-logo.svg",
  ],
  ignoredRoutes: ["/api/webhook", "/api/chatgpt"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
