/* global fetch */
import { Component } from 'react'
import qs from 'querystring'
import 'isomorphic-fetch'

import { Router } from '../routes'
import Page from '../components/page'
import saveSession from '../lib/session'
import config from '../config'

/*
 * this page confirms an email and temp token with our auth-api
 * if confirmed, the auth-api should return a long lived token,
 * which this page will store locally
 */

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

      saveSession(session)

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
