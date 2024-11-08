import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server'

const isPublicPage = createRouteMatcher(['/'])
const isLoginPage = createRouteMatcher(['/login'])
const isProtectedPage = createRouteMatcher(['/dashboard', '/dashboard/(.*)'])

export default convexAuthNextjsMiddleware((request) => {
    if (isPublicPage(request)) {
        return
    }
    if (isProtectedPage(request) && !isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, '/login')
    }
    if (isLoginPage(request) && isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, '/dashboard')
    }
})

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
