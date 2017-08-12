/* global fetch */
import { Component } from 'react'
import qs from 'querystring'
import Cookie from 'js-cookie'
import 'isomorphic-fetch'

import Page from '../../components/page'
import config from '../../config'

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

  static async getInitialProps ({ query }) {
    return { query }
  }

  async componentDidMount () {
    const { query, url } = this.props
    console.log('query', query)

    const res = await fetch(
      `${config.api.auth_url}/confirm?${qs.stringify(query)}`
    )

    if (res.ok) {
      let { email, token } = await res.json()
      console.log('response', { email, token })

      // Store the email, token for the benefit of client and server
      window.localStorage.setItem('email', email)
      window.localStorage.setItem('token', token)
      Cookie.set('email', email, { secure: isProduction })
      Cookie.set('token', token, { secure: isProduction })

      url.replace('/upload')
    } else {
      const error = await res.text()
      this.setState({ error })
    }
  }

  render () {
    const { error } = this.state

    return (
      <div>
        <p>{error}</p>
      </div>
    )
  }
}

export default Page(Confirm)
