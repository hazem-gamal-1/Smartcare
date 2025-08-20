import {
  clerkMiddleware,
  createRouteMatcher,
  ClerkMiddlewareAuth,
} from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/specialties(.*)",
  "/booking(.*)",
  "/ai-tools(.*)",
]);

export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, req) => {
  if (!isProtectedRoute(req)) return;

  // Ensure user is signed in
  const session = await auth.protect();
  if (!session) return; // should never happen

  // Get userId from session
  const userId = session.userId;
  if (!userId) return;

  // Fetch Clerk user object
  const user = await clerkClient.users.getUser(userId);

  // Check if profile is complete
  const completeProfile = user.unsafeMetadata?.completeProfile;

  if (!completeProfile) {
    const url = req.nextUrl.clone();
    url.pathname = "/complete-profile"; // redirect
    return Response.redirect(url);
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
