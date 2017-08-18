import React from 'react'

/*
 * Dredges up a `session` object from cookie or localStorage and, if present,
 * injects it as a prop. Also keeps track of the current session in
 * component state so that multiple tabs open in the same browser can react
 * to sign ins/outs.
 */

const getSessionFromLocalStorage = () => {
  const email = window.localStorage.getItem('email')
  const token = window.localStorage.getItem('token')
  return { email, token }
}

const getSessionFromCookie = (req) => {
  // cookie should be "email=email@domain.org; token=a1b2c3d4e5f6g7h8"
  const { cookie } = req.headers

  if (cookie) {
    const emailCookie = cookie
      .split(';')
      .map(s => s.trim())
      .find(s => s.startsWith('email='))
    const tokenCookie = cookie
      .split(';')
      .map(s => s.trim())
      .find(s => s.startsWith('token='))

    // If there's an email and token
    if (emailCookie && tokenCookie) {
      // Pull out and cleanup email and token
      const email = emailCookie.split('=').pop().trim()
      const token = tokenCookie.split('=').pop().trim()

      if (email && token) {
        return { email, token }
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

      // session should be { email, token }
      const session = process.browser
        ? getSessionFromLocalStorage()
        : getSessionFromCookie(ctx.req)
      console.log('session', session)

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
