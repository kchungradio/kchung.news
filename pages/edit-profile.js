import { Component } from 'react'
import request from 'axios'

import SecurePage from '../components/hoc/secure-page'
import { Router } from '../routes'
import slugify from '../lib/slugify'
import saveSession from '../lib/session'
import config from '../config'

class ProfileForm extends Component {
  state = {
    newName: this.props.session.name,
    error: null
  }

  handleInputChange = event => {
    const newName = event.target.value
    this.setState({ newName })
  }
  handleFormSubmit = async event => {
    event.preventDefault()
    this.setState({ error: null })
    const { session } = this.props
    const { newName } = this.state

    // TODO: send auth header
    // TODO: make sure they're not using a name that already exists

    // urls
    const authApiUrl = `${config.api.authUrl}/user/${session.slug}`
    const storiesApiUrl = `${config.api.storiesUrl}/author/${session.slug}`

    // send name change to servers asynchronously
    try {
      // update user's name and all their stories
      // TODO: make sure if auth fails then storiesApi doesn't get called
      await request.put(authApiUrl, { newName, session })
      await request.put(storiesApiUrl, { newName, session })

      // update session
      session.name = newName
      session.slug = slugify(newName)
      saveSession(session)

      // route to user's stories
      Router.pushRoute(`/${session.slug}`)
    } catch (err) {
      console.error(err)
      // TODO: set error with err.message
      this.setError(`Name changing didn't work for some reason. Email web@kchungradio.org`)
    }
  }

  setError = error => this.setState({ error })

  render () {
    const {
      newName,
      error
    } = this.state

    return (
      <div>
        <form id='profile-form' onSubmit={this.handleFormSubmit}>
          <p>Name:</p>
          <br />
          <input
            type='text'
            name='newName'
            value={newName}
            onChange={this.handleInputChange}
          />
          {error && <br />}
          <p>{error}</p>
          <br />
          <input
            form='profile-form'
            type='submit'
            className='btn-md'
            value='Save'
          />
        </form>

        <style jsx>{`
          form {
            display: flex;
            flex-direction: column;
            align-items: left;
            text-align: left;
            margin-top: 100px;
          }
          input[type=text] {
            width: 275px;
            text-align: left;
          }
        `}</style>
      </div>
    )
  }
}

export default SecurePage(ProfileForm)
