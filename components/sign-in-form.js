/* global fetch */

import { Component } from 'react'
import validator from 'validator'

import config from '../config'

const checkEmailWithServer = email => {
  return fetch(config.api.auth_url, {
    method: 'POST',
    body: JSON.stringify({ email })
  })
}

class SignInForm extends Component {
  state = {
    email: '',
    emailSent: false,
    message: '',
    error: null
  }

  handleInputChange = event => {
    const email = event.target.value
    this.setState({ email })
  }
  handleFormSubmit = async event => {
    event.preventDefault()
    const { email, emailSent } = this.state
    if (emailSent) return

    if (validator.isEmail(email)) {
      this.setState({ error: null })
      const res = await checkEmailWithServer(email)
      if (res.ok) {
        this.setState({
          emailSent: true,
          message: `An email has been sent to ${email}. \
          Please click the link in the email to log in.`
        })
      } else {
        // something errored, what happened?
        switch (res.status) {
          case 401:
            this.setError(`That email isn't registered. If you'd \
              like an account, sign up under participate.`)
            break
          default:
            this.setError('Unexpected error')
        }
      }
    } else {
      this.setState({ error: 'Please enter a valid email.' })
    }
  }

  setError = error => this.setState({ error })

  render () {
    const {
      email,
      emailSent,
      message,
      error
    } = this.state

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <p>Sign in with your email:</p>
          <br />
          <input
            type='text'
            name='email'
            value={email}
            onChange={this.handleInputChange}
          />
          {(message || error) && <br />}
          <p>{message}</p>
          <p>{error}</p>
          <br />
          {!emailSent && <button type='submit'>sign in</button>}
        </form>

        <style jsx>{`
          form {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-top: 33%;
          }
          input {
            width: 80%;
          }
          button {
            background-color: white;
          }
        `}</style>
      </div>
    )
  }
}

export default SignInForm
