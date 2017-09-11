/* global fetch */

import { Component } from 'react'

import { Router } from '../routes'
import config from '../config'
import Field from '../components/form-field'
import UploadField from '../components/upload-field'

class UploadForm extends Component {
  state = {
    fields: this.props.storyToEdit || {},
    fieldErrors: {},
    submitted: false
  }

  handleFormSubmit = async event => {
    event.preventDefault()
    // XXX user can still submit multiple times even though we're
    //     disabling the button with this setState call
    this.setState({ submitted: true })

    const { session, storyToEdit } = this.props

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
      authorId: session.id,
      authorSlug: session.slug,
      author: session.name
    }
    if (!storyToEdit) {
      story.publishedAt = new Date().toISOString()
    }

    const type = storyToEdit ? 'edit' : 'new'
    console.log(`${type}-story`, story)

    // 📫 TODO: use axios
    const method = storyToEdit ? 'PUT' : 'POST'
    const storyPath = storyToEdit ? `/${storyToEdit.titleSlug}` : ''
    const apiUrl = `${config.api.storiesUrl}${storyPath}`
    // XXX: i'm not sure that this try block catches http error codes...
    try {
      await fetch(apiUrl, {
        method,
        body: JSON.stringify(story)
      })
    } catch (err) {
      console.error(err)
    }

    // route to user's stories
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

  onAudioUploadFinish = ({ originalFilename, filename, publicUrl }) => {
    const { fields } = this.state
    if (!fields.audio) fields.audio = {}

    fields.audio = { originalFilename, filename, publicUrl }
    this.setState({ fields })
  }
  onImageUploadFinish = ({ originalFilename, filename, publicUrl }) => {
    const { fields } = this.state
    if (!fields.images) fields.images = []

    const image = { originalFilename, filename, publicUrl }
    fields.images = [ ...fields.images, image ]
    this.setState({ fields })
  }

  render () {
    const { session, storyToEdit } = this.props
    const { fields, submitted } = this.state

    if (Array.isArray(fields.tags)) {
      fields.tags = fields.tags.join(' ')
    }

    return (
      <div className='form-container'>

        <form id='story-form' onSubmit={this.handleFormSubmit}>

          <Field
            placeholder='* Story Title'
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

          <div className='upload-group'>
            <UploadField
              label='* select an audio file'
              mimeType='audio/*'
              onUploadFinish={this.onAudioUploadFinish}
              session={session}
              value={fields.audio && fields.audio.originalFilename}
            />

            <UploadField
              label='select photo(s):'
              mimeType='image/*'
              multiple
              onUploadFinish={this.onImageUploadFinish}
              session={session}
            />
          </div>

          <input
            form='story-form'
            type='submit'
            className='btn-lg'
            value={storyToEdit ? 'Save' : 'Create new story'}
            disabled={submitted || !this.validateForm()}
          />

        </form>

        <style jsx>{`
          .form-container {
            width: 80%;
          }
          .upload-group {
            padding: 15px 0 10px 0;
          }
          input[type=submit] {
            margin: 10px 0;
          }
        `}</style>

      </div>
    )
  }
}

export default UploadForm
