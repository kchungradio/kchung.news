import { Component } from 'react'

import destroyToken from '../../lib/destroy-token'
import { Router } from '../../routes'
import SecurePage from '../../components/hoc/secure-page'

class SignOut extends Component {
  componentDidMount () {
    if (process.browser) {
      destroyToken()
    }
    Router.pushRoute('stories')
  }

  render () {
    return (
      <div>signing out...</div>
    )
  }
}

export default SecurePage(SignOut)
