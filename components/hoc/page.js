import injectSession from './inject-session'
import wrapWithLayout from './wrap-with-layout'
import compose from '../../lib/compose'

/*
 * some middleware we use on every page
 *
 * gets called like `injectSession(wrapWithLayout(Page))`
 * so it's really a flow, not a compose
 */

export default compose(
  injectSession,
  wrapWithLayout
)
