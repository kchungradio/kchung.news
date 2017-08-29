/* global fetch */
import { Component } from 'react'
import qs from 'querystring'
import Cookie from 'js-cookie'
import 'isomorphic-fetch'

import { Router } from '../routes'
import Page from '../components/page'
import config from '../config'

/*
 * this page confirms an email and temp token with our auth-api
 * if confirmed, the auth-api should return a long lived token,
 * which this page will store locally
 */

const isProduction = process.env.NODE_ENV === 'production'

class Confirm extends Component {
  state = {
    error: ''
  }

  static getInitialProps ({ query }) {
    return { query }
  }

  async componentDidMount () {
    const { query } = this.props

    // get session
    const res = await fetch(
      `${config.api.authUrl}/confirm?${qs.stringify(query)}`
    )

    if (res.ok) {
      const session = await res.json()
      const sessionStr = JSON.stringify(session)
      const encodedSessionStr = window.btoa(sessionStr)

      // store the session for the benefit of client and server
      window.localStorage.setItem('session', sessionStr)
      Cookie.set('session', encodedSessionStr, { secure: isProduction })

      Router.pushRoute('stories')
    } else {
      const error = await res.text()
      this.setState({ error })
    }
  }

  render () {
    const { error } = this.state

    return (
      <div>
        {error ? <p>{error}</p> : <div>signing in...</div>}
      </div>
    )
  }
}

export default Page(Confirm)
