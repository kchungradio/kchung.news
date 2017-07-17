import { Component } from 'react'

import Layout from '../layouts/main'
import SignInForm from '../components/sign-in-form'

class Upload extends Component {
  componentDidMount () {
    const token = window.localStorage.getItem('token')
    console.log(token)
    if (token) {
    }
  }

  signedIn = () => {
    return this.user
  }

  render () {
    return (
      <Layout>
        {this.signedIn() ? null : <SignInForm />}
      </Layout>
    )
  }
}

export default Upload
