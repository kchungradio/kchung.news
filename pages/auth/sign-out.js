import { Component } from 'react'

import destroyToken from '../../lib/destroy-token'
import Router from 'next/router'
import SecurePage from '../../components/hoc/secure-page'

class SignOutPage extends Component {
  componentDidMount() {
    if (process.browser) {
      destroyToken()
    }
    Router.push('/')
  }

  render() {
    return <div>signing out...</div>
  }
}

export default SecurePage(SignOutPage)
