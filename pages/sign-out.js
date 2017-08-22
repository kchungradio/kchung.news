import React from 'react'
import { Router } from '../routes'
import Cookie from 'js-cookie'

import Page from '../components/page'

class SignOut extends React.Component {
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

export default Page(SignOut)
