import { Component } from 'react'
import Cookie from 'js-cookie'

import { getSession } from '../../lib/session'

/*
 * Dredges up a json web token (jwt) from cookie or localStorage and,
 * if present, injects its payload as a prop. Also keeps track of the
 * current session in component state so that multiple tabs open in
 * the same browser can react to sign ins/outs.
 *
 * If you want the session prop in child components, you must
 * pass it down.
 */

const injectSession = Page => {
  return class InjectSession extends Component {
    // we need state so that we can trigger an update of children
    // components when the session changes
    state = {}

    static async getInitialProps(ctx) {
      // Get the page's own initial props
      const initialProps = Page.getInitialProps
        ? await Page.getInitialProps(ctx)
        : {}

      // session should be { email, name, slug, id, token, iat, exp, aud, iss }
      const session = getSession(ctx.req)

      // Inject any initial props and session
      return { ...initialProps, session }
    }

    constructor(props) {
      super(props)

      // remove old tokens
      if (process.browser) {
        window.localStorage.removeItem('session')
        Cookie.remove('session')
      }
    }

    render() {
      // Pass on whatever props exist and state
      return <Page {...this.props} {...this.state} />
    }

    componentDidMount() {
      // Use component state to track the session
      if (process.browser) {
        window.addEventListener('storage', this.handleStorageChange)
      }
    }

    componentWillUnmount() {
      // Stop tracking session
      if (process.browser) {
        window.removeEventListener('storage', this.handleStorageChange)
      }
    }

    handleStorageChange = event => {
      // Keep component state up to date with current session as it changes.
      // This is so other tabs open in the same browser can respond to session
      // changes.
      if (event.key === 'session') {
        if (event.newValue) {
          this.setState({ session: JSON.parse(event.newValue) })
        } else {
          this.setState({ session: null })
        }
      }
    }
  }
}

export default injectSession
