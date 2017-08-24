import React from 'react'

/*
 * Dredges up a `session` object from cookie or localStorage and, if present,
 * injects it as a prop. Also keeps track of the current session in
 * component state so that multiple tabs open in the same browser can react
 * to sign ins/outs.
 */

const getSessionFromLocalStorage = () => {
  const sessionStr = window.localStorage.getItem('session')
  const session = JSON.parse(sessionStr)

  if (session) {
    return session
  }
}

const getSessionFromCookie = (req) => {
  // this only runs on the server

  const { cookie } = req.headers

  if (cookie) {
    const sessionCookie = cookie
      .split(';')
      .map(s => s.trim())
      .find(s => s.startsWith('session='))

    // pull out and cleanup session
    if (sessionCookie) {
      // split on first equals sign because of base64 padding
      // https://stackoverflow.com/a/4607799/1386245
      const encodedSessionStr = sessionCookie.split(/=(.+)/)[1]
      const sessionStr = Buffer.from(encodedSessionStr, 'base64')
        .toString('ascii')
      const session = JSON.parse(sessionStr)

      if (session) {
        return session
      }
    }
  }
}

const injectSession = Page => {
  return class InjectSession extends React.Component {
    // we need state so that we can trigger an update of children
    // components when the session changes
    state = {}

    static async getInitialProps (ctx) {
      // Get the page's own initial props
      const initialProps = Page.getInitialProps
        ? await Page.getInitialProps(ctx)
        : {}

      // session should be { email, name, slug, token }
      const session = process.browser
        ? getSessionFromLocalStorage()
        : getSessionFromCookie(ctx.req)

      // Inject any initial props and session
      return { ...initialProps, session }
    }

    render () {
      // Pass on whatever props exist and state
      return <Page {...this.props} {...this.state} />
    }

    componentWillMount () {
      // Use component state to track the session
      if (process.browser) {
        window.addEventListener('storage', this.handleStorageChange)
      }
    }

    componentWillUnmount () {
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
