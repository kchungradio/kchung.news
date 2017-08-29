import { Component } from 'react'

import { Router } from '../routes'

/*
 * Causes page component to be redirected to `/sign-in` if there is no
 * `this.props.session` available.
 */

const ensureSignedIn = Page => {
  return class EnsureSignedIn extends Component {
    static getInitialProps (ctx) {
      // If the page has a prop fetcher invoke it
      return Page.getInitialProps
        ? Page.getInitialProps(ctx)
        : {}
    }

    constructor (props) {
      super(props)

      // On the client redirect right away to the sign in page if
      // there's no session
      if (process.browser && !props.session) {
        Router.pushRoute('sign-in')
      }
    }

    componentWillReceiveProps (nextProps) {
      // On the client redirect to the sign in page if the session
      // gets signed out in another tab
      if (process.browser && !nextProps.session) {
        Router.pushRoute('sign-in')
      }
    }

    render () {
      if (this.props.session) {
        return (
          <div>
            <Page {...this.props} />
          </div>
        )
      } else {
        return null
      }
    }
  }
}

export default ensureSignedIn
