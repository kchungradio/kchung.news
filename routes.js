const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

/*
 * All pages/routes must be defined here.
 *
 * This honors the pages directory, but it makes it so that anything
 * other than a defined page goes to the authorStories route.
 *
 * All this so we can show an author's stories at:
 * https://kchung.news/author-name-slug
 *
 * Note: No author can be named the same as any of the routes.
 *   TODO: make a name check to prevent this
 *
 * If you change a route, make sure you check all Link and
 * Router components
 *
 * See https://github.com/fridays/next-routes
 */

/*
 * i had to point participate and sign-in routes to stories.js to
 * keep the player playing through route transitions, at least on
 * the pages that a non-logged-in user has access to
 *
 * when issue #88 gets addressed then we'll solve this elegantly
 * https://github.com/zeit/next.js/issues/88
 */

routes.add('stories', '/')
routes.add('new-story')
routes.add('edit-story', '/edit/:storySlug')
routes.add('edit-profile')
routes.add('participate', '/participate', 'stories')
routes.add('sign-in', '/sign-in', 'stories')
routes.add('sign-out', '/sign-out', 'auth/sign-out')
routes.add('confirm', '/registration/confirm', 'auth/confirm')
routes.add('authorStories', '/:authorSlug', 'stories')
