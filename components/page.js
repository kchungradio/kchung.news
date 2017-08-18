import injectSession from './injectSession'
import wrapWithLayout from './wrapWithLayout'
import compose from '../lib/compose'

// some middleware we use on every page
export default compose(injectSession, wrapWithLayout)
