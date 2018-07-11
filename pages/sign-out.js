import { Component } from 'react'
import Cookie from 'js-cookie'

import { Router } from '../routes'
import SecurePage from '../components/hoc/secure-page'

class SignOut extends Component {
  componentDidMount () {
    if (process.browser) {
      window.localStorage.removeItem('session')
      Cookie.remove('session')
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
