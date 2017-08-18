import React from 'react'
import Router from 'next/router'
import Cookie from 'js-cookie'

import Page from '../components/page'

class SignOut extends React.Component {
  componentDidMount () {
    if (process.browser) {
      window.localStorage.removeItem('email')
      window.localStorage.removeItem('token')
      Cookie.remove('email')
      Cookie.remove('token')
    }
    Router.push('/')
  }

  render () {
    return (
      <div>signing out...</div>
    )
  }
}

export default Page(SignOut)
