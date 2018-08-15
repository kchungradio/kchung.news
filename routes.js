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

routes.add('stories', '/')
routes.add('stories-gql')
routes.add('participate')
routes.add('new-story')
routes.add('edit-story', '/edit/:storySlug')
routes.add('edit-profile')
routes.add('sign-in', '/sign-in', 'auth/sign-in')
routes.add('sign-out', '/sign-out', 'auth/sign-out')
routes.add('confirm', '/registration/confirm', 'auth/confirm')
routes.add('authorStories', '/:authorSlug', 'stories-gql')
