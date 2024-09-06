import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/categories",
    "/categories/:category",
    "/categories/:category/equipments",
    "/categories/:category/equipments/:id",
    "/api/uploadthing",
    "/api/webhooks",
    "/api/webhooks/clerk",
    "/api/webhooks/stripe",
    "/:catchall",
  ],
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
