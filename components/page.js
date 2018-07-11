import injectSession from './injectSession'
import wrapWithLayout from './wrapWithLayout'
import compose from '../lib/compose'

/*
 * some middleware we use on every page
 *
 * gets called like `injectSession(wrapWithLayout(Page))`
 * so it's really a flow, not a compose
 */

export default compose(injectSession, wrapWithLayout)
