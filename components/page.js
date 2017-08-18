import compose from '../lib/compose'
import injectSession from './injectSession'
import wrapWithLayout from './wrapWithLayout'

// some middleware we use on every page
export default compose(injectSession, wrapWithLayout)
