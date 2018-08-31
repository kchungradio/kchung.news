import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Field extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func.isRequired
  }
  static defaultProps = {
    type: 'text'
  }
  state = {
    error: false
  }

  onChange = (event) => {
    const name = this.props.name
    const value = event.target.value
    const error = this.props.validate ? this.props.validate(value) : false

    this.setState({ error })
    this.props.onChange({ name, value, error })
  }

  renderInput = () => {
    return (
      <input
        type='text'
        name={this.props.name}
        placeholder={this.props.placeholder}
        value={this.props.value || ''}
        onChange={this.onChange}
        spellCheck={false}
      />
    )
  }
  renderTextArea = () => {
    return (
      <textarea
        name={this.props.name}
        placeholder={this.props.placeholder}
        value={this.props.value || ''}
        onChange={this.onChange}
      />
    )
  }

  render () {
    const { type } = this.props

    return (
      <div>

        {type === 'text' && this.renderInput()}
        {type === 'textarea' && this.renderTextArea()}

        <span className='error'>
          {this.state.error}
        </span>

      </div>
    )
  }
}
