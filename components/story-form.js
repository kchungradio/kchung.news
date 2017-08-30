/* global fetch */

import { Component } from 'react'

import { Router } from '../routes'
import config from '../config'
import Field from '../components/form-field'
import UploadField from '../components/upload-field'

class UploadForm extends Component {
  state = {
    fields: {},
    fieldErrors: {},
    submitted: false
  }

  handleFormSubmit = async event => {
    event.preventDefault()
    // XXX user can still submit multiple times even though we're disabling
    //     the button with this setState call
    this.setState({ submitted: true })

    const { session } = this.props

    if (!session) return
    if (!this.validateForm()) return

    const { fields } = this.state

    // trim all trimable inputs
    for (let key in fields) {
      if (fields[key].trim) {
        fields[key] = fields[key].trim()
      }
    }

    // split tags to an array on whitespace or comma
    if (fields.tags) fields.tags = fields.tags.split(/[ ,]+/)

    // our user's story
    const story = {
      ...fields,
      authorSlug: session.slug,
      author: session.name,
      publishedAt: new Date().toISOString()
    }

    console.log('story', story)

    // 📫
    // TODO: use axios.post here
    try {
      await fetch(config.api.storiesUrl, {
        method: 'POST',
        body: JSON.stringify(story)
      })
    } catch (err) {
      console.error(err)
    }

    // clear form and redirect
    this.setState({ fields: {} })
    Router.pushRoute(`/${session.slug}`)
  }

  handleInputChange = ({ name, value, error }) => {
    const { fields, fieldErrors } = this.state

    fields[name] = value
    fieldErrors[name] = error

    this.setState({ fields, fieldErrors })
  }

  validateForm = () => {
    const { fields, fieldErrors } = this.state
    const errMessages = Object.keys(fieldErrors)
      .filter(k => fieldErrors[k])

    if (!fields.title) return false
    if (!fields.audio) return false
    if (errMessages.length) return false

    return true
  }

  onAudioUploadFinish = ({ filename, publicUrl }) => {
    const { fields } = this.state
    if (!fields.audio) fields.audio = {}

    fields.audio = { filename, publicUrl }
    this.setState({ fields })
  }
  onImageUploadFinish = ({ filename, publicUrl }) => {
    const { fields } = this.state
    if (!fields.images) fields.images = []

    const image = { filename, publicUrl }
    fields.images = [ ...fields.images, image ]
    this.setState({ fields })
  }

  render () {
    const { session } = this.props
    const { fields, submitted } = this.state

    return (
      <div className='form-container'>

        <form id='story-form' onSubmit={this.handleFormSubmit}>

          <Field
            placeholder='Story Title'
            name='title'
            value={fields.title || ''}
            onChange={this.handleInputChange}
            validate={val => (val ? false : 'Title is required')}
          />

          <Field
            placeholder='Description'
            name='description'
            type='textarea'
            value={fields.description || ''}
            onChange={this.handleInputChange}
          />

          <Field
            placeholder='Location'
            name='location'
            value={fields.location || ''}
            onChange={this.handleInputChange}
          />

          <Field
            placeholder='Series Name'
            name='series'
            value={fields.series || ''}
            onChange={this.handleInputChange}
          />

          <Field
            placeholder='Tags'
            name='tags'
            value={fields.tags || ''}
            onChange={this.handleInputChange}
          />

          <UploadField
            label='select an audio file:'
            mimeType='audio/*'
            onUploadFinish={this.onAudioUploadFinish}
            session={session}
          />

          <UploadField
            label='select photo(s):'
            mimeType='image/*'
            multiple
            onUploadFinish={this.onImageUploadFinish}
            session={session}
          />

          <input
            form='story-form'
            type='submit'
            className='submit'
            disabled={submitted || !this.validateForm()}
          />

        </form>

        <style jsx>{`
          .form-container {
            width: 80%;
          }
          .submit {
            width: 88px;
            background-color: white;
            color: red;
            margin: 8px 10px;
            border-radius: 2px;
          }
          .submit:active {
            background-color: #eee;
          }
          .submit:disabled {
            background-color: grey;
            color: white;
          }
          .submit:disabled:hover {
            cursor: not-allowed;
          }
        `}</style>

      </div>
    )
  }
}

export default UploadForm
