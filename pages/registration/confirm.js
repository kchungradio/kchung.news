import { Component } from 'react'
import qs from 'querystring'
import fetch from 'isomorphic-unfetch'
import { withRouter } from 'next/router'

import Page from '../../components/hoc/page'
import saveToken from '../../lib/save-token'
import config from '../../config'

/*
 * this page confirms an email and temp token with our auth-api
 * if confirmed, the auth-api should return a long lived token,
 * which this page will store locally
 */

class ConfirmPage extends Component {
  state = {
    error: ''
  }

  async componentDidMount() {
    const { router } = this.props

    // get token
    const res = await fetch(
      `${config.api.auth}/confirm?${qs.stringify(router.query)}`
    )

    if (res.ok) {
      const token = await res.text()
      saveToken(token)
      router.push('/')
    } else {
      const error = await res.text()
      this.setState({ error })
    }
  }

  render() {
    const { error } = this.state

    return (
      <div>
        {error ? (
          <p>{error}</p>
        ) : (
          <div>
            <i>Signing in...</i>
          </div>
        )}
      </div>
    )
  }
}

export default Page(withRouter(ConfirmPage))
