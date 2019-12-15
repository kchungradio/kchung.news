import Page from './page'
import ensureSignedIn from './ensure-signed-in'
import compose from '../../lib/compose'

// use the typical `Page` middleware and redirect to `/auth/sign-in`
// when there's no session
export default compose(Page, ensureSignedIn)
