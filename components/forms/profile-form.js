import { Component } from 'react'

import Field from './form-field'

class ProfileForm extends Component {
  state = {
    name: this.props.name,
    submitted: false
  }

  handleInputChange = ({ name, value }) => this.setState({ [name]: value })

  handleFormSubmit = event => {
    event.preventDefault()
    this.setState({ submitted: true })
    this.props.onSubmit(this.state.name)
  }

  render () {
    const { onCancel, loading } = this.props
    const { name, submitted } = this.state

    return (
      <div className='form-container'>
        <br />
        <small><i>Changing your name will sign you out.</i></small>
        <br />
        <form id='profile-form' onSubmit={this.handleFormSubmit}>
          <Field
            placeholder='Name'
            name='name'
            value={name}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            form='profile-form'
            type='submit'
            className='btn-lg'
            value='Save'
            disabled={name === this.props.name || loading || submitted}
          />
          <button
            type='button'
            className='btn-lg'
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>

        <style jsx>{`
          .form-container {
            width: 80%;
          }
          input[type=submit],
          button {
            margin: 10px 10px 10px 0;
          }
        `}</style>
      </div>
    )
  }
}

export default ProfileForm
