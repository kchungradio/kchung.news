import { Component } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DateUtils } from 'react-day-picker'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'

import Field from './form-field'
import UploadField from './upload-field'
import Images from '../images'

import 'react-day-picker/lib/style.css'

const FORMAT = 'MMMM Do, YYYY'

const omitTypename = (key, value) => (key === '__typename' ? undefined : value)

class UploadForm extends Component {
  state = {
    fields: (this.props.storyToEdit &&
      JSON.parse(JSON.stringify(this.props.storyToEdit), omitTypename)) || {
      publishedAt: new Date().toISOString()
    },
    fieldErrors: {},
    submitted: false
  }

  handleFormSubmit = async event => {
    event.preventDefault()
    this.setState({ submitted: true })
    const { session, onSubmit } = this.props

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

    // split tags to an array on whitespace or comma
    if (story.tags) story.tags = story.tags.split(/[ ,]+/)

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

  handleDayChange = day => {
    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        publishedAt: day.toISOString()
      }
    }))
  }

  validateForm = () => {
    const { fields, fieldErrors } = this.state
    const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k])

    if (!fields.title) return false
    if (!fields.audio) return false
    if (errMessages.length) return false

    return true
  }

  onAudioUploadFinish = ({ originalFilename, filename, publicUrl }) => {
    // XXX use functional setState
    const { fields } = this.state
    if (!fields.audio) fields.audio = {}

    fields.audio = { originalFilename, filename }
    this.setState({ fields })
  }
  onImageUploadFinish = ({ originalFilename, filename }) => {
    // XXX use functional setState
    const { fields } = this.state
    if (!fields.images) fields.images = []

    const image = { originalFilename, filename }
    fields.images = [...fields.images, image]
    this.setState({ fields })
  }

  removeImage = id => {
    this.setState(({ fields }) => ({
      fields: {
        ...fields,
        images: fields.images.filter(image => image.id !== id)
      }
    }))
  }

  render() {
    const { session, storyToEdit, onCancel, onDelete, loading } = this.props
    const { fields, submitted } = this.state

    if (Array.isArray(fields.tags)) {
      fields.tags = fields.tags.join(' ')
    }

    return (
      <div className="form-container">
        <form id="story-form" onSubmit={this.handleFormSubmit}>
          <Field
            placeholder="* Story Title"
            name="title"
            value={fields.title}
            onChange={this.handleInputChange}
            validate={val => (val ? false : 'Title is required')}
          />

          <Field
            placeholder="Description"
            name="description"
            type="textarea"
            value={fields.description}
            onChange={this.handleInputChange}
          />

          <Field
            placeholder="Location"
            name="location"
            value={fields.location}
            onChange={this.handleInputChange}
          />

          <Field
            placeholder="Series Name"
            name="series"
            value={fields.series}
            onChange={this.handleInputChange}
          />

          <Field
            placeholder="Tags"
            name="tags"
            value={fields.tags}
            onChange={this.handleInputChange}
          />

          <div className="upload-group">
            <UploadField
              label="* select an audio file"
              mimeType="audio/*"
              onUploadFinish={this.onAudioUploadFinish}
              token={session.token}
            >
              <div>{fields.audio && fields.audio.originalFilename}</div>
            </UploadField>

            <UploadField
              label="select photo(s):"
              mimeType="image/*"
              multiple
              onUploadFinish={this.onImageUploadFinish}
              token={session.token}
            >
              <Images images={fields.images} onDelete={this.removeImage} />
            </UploadField>
          </div>

          <div>
            <p>Published Date</p>
            <DayPickerInput
              value={formatDate(fields.publishedAt, FORMAT)}
              onDayChange={this.handleDayChange}
              format={FORMAT}
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: new Date(fields.publishedAt),
                month: new Date(fields.publishedAt),
                todayButton: 'Today'
              }}
            />
          </div>

          <input
            form="story-form"
            type="submit"
            className="btn-lg"
            value={storyToEdit ? 'Save' : 'Create new story'}
            disabled={loading || submitted || !this.validateForm()}
          />
          <button type="button" className="btn-lg" onClick={onCancel}>
            Cancel
          </button>
          {storyToEdit && (
            <button
              type="button"
              className="btn-lg"
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
          input[type='submit'],
          button {
            margin: 10px 10px 10px 0;
          }
        `}</style>
      </div>
    )
  }
}

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale })
  if (DateUtils.isDate(parsed)) {
    return parsed
  }
  return undefined
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale })
}

export default UploadForm
