/* global fetch */
import { Component } from 'react'
import qs from 'querystring'
import 'isomorphic-fetch'

import Page from '../../components/page'
import config from '../../config'

/*
 * this page confirms an email and temp token with our auth-api
 * if confirmed, the auth-api should return a long lived token,
 * which this page will store locally
 */

class Confirm extends Component {
  state = {
    message: ''
  }

  static async getInitialProps ({ query }) {
    return { query }
  }

  async componentDidMount () {
    const { query } = this.props
    console.log('query', query)

    const res = await fetch(
      `${config.api.auth_url}/confirm?${qs.stringify(query)}`
    )

    console.log(res)
    if (res.ok) {
      let { email, token } = await res.json()
      console.log('response', { email, token })
      // TODO save token to cookie/localStorage
      // TODO router.replace /upload
    } else {
      const message = await res.text()
      this.setState({ message })
    }
  }

  render () {
    const { message } = this.state

    return (
      <div>
        <p>{message}</p>
      </div>
    )
  }
}

export default Page(Confirm)
