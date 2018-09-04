const nextRoutes = require('next-routes')

const routes = (module.exports = nextRoutes())

/*
 * Pages and routes are defined here.
 *
 * If you change a route, make sure you check all Link and
 * Router components, and update if necessary.
 *
 * See https://github.com/fridays/next-routes
 */

routes.add('stories', '/')
routes.add('channel', '/channel/:authorSlug')
routes.add('participate')

routes.add('new-story')
routes.add('edit-story', '/edit/:storySlug')
routes.add('edit-profile')

routes.add('sign-in', '/sign-in', 'auth/sign-in')
routes.add('sign-out', '/sign-out', 'auth/sign-out')
routes.add('confirm', '/registration/confirm', 'auth/confirm')
