import { Component } from 'react'

import Field from './form-field'
import UploadField from './upload-field'

const omitTypename = (key, value) => (key === '__typename' ? undefined : value)

class UploadForm extends Component {
  state = {
    fields: (this.props.storyToEdit && JSON.parse(JSON.stringify(this.props.storyToEdit), omitTypename)) || {},
    fieldErrors: {},
    submitted: false
  }

  handleFormSubmit = async event => {
    event.preventDefault()
    this.setState({ submitted: true })
    const { session, storyToEdit, onSubmit } = this.props

    if (!session) return
    if (!this.validateForm()) return

    const story = { ...this.state.fields }

    delete story.id
    delete story.slug
    delete story.author

    // trim all trimable fields
    for (let key in story) {
      if (story[key] && story[key].trim) {
        story[key] = story[key].trim()
      }
    }

    if (story.tags) story.tags = story.tags.split(/[ ,]+/)

    if (!storyToEdit) {
      story.publishedAt = new Date().toISOString()
    }

    onSubmit(story)
  }

  handleInputChange = ({ name, value, error }) => {
    this.setState(prevState => {
      const { fields, fieldErrors } = prevState
      fields[name] = value
      fieldErrors[name] = error
      return { fields, fieldErrors }
    })
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

    fields.audio = { originalFilename, filename }
    this.setState({ fields })
  }
  onImageUploadFinish = ({ originalFilename, filename }) => {
    const { fields } = this.state
    if (!fields.images) fields.images = []

    const image = { originalFilename, filename }
    fields.images = [ ...fields.images, image ]
    this.setState({ fields })
  }

  render () {
    const { session, storyToEdit, onCancel, onDelete, loading } = this.props
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
            value={fields.title}
            onChange={this.handleInputChange}
            validate={val => (val ? false : 'Title is required')}
          />

          <Field
            placeholder='Description'
            name='description'
            type='textarea'
            value={fields.description}
            onChange={this.handleInputChange}
          />

          <Field
            placeholder='Location'
            name='location'
            value={fields.location}
            onChange={this.handleInputChange}
          />

          <Field
            placeholder='Series Name'
            name='series'
            value={fields.series}
            onChange={this.handleInputChange}
          />

          <Field
            placeholder='Tags'
            name='tags'
            value={fields.tags}
            onChange={this.handleInputChange}
          />

          <div className='upload-group'>
            <UploadField
              label='* select an audio file'
              mimeType='audio/*'
              onUploadFinish={this.onAudioUploadFinish}
              session={session}
              value={fields.audio && (
                fields.audio.originalFilename ||
                fields.audio.filename
              )}
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
            disabled={loading || submitted || !this.validateForm()}
          />
          <button
            type='button'
            className='btn-lg'
            onClick={onCancel}
          >
            Cancel
          </button>
          {storyToEdit && (
            <button
              type='button'
              className='btn-lg'
              onClick={() => onDelete(storyToEdit.id)}
            >
              Delete
            </button>
          )}
        </form>

        <style jsx>{`
          .form-container {
            width: 80%;
          }
          .upload-group {
            padding: 15px 0 10px 0;
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

export default UploadForm
