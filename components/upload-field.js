import { Component } from 'react'
import PropTypes from 'prop-types'

import ReactS3Uploader from 'react-s3-uploader'
import ProgressBar from 'react-progressbar'

import config from '../config'

export default class extends Component {
  static propTypes = {
    label: PropTypes.string,
    multiple: PropTypes.bool,
    mimeType: PropTypes.string,
    onUploadFinish: PropTypes.func
  }

  state = {
    progress: 0
  }

  onUploadProgress = (percent, message) => {
    this.setState({ progress: percent })
    console.log('Upload progress: ' + percent + '% ' + message)
  }
  onUploadError = err => console.error(err)
  onUploadFinish = signedResult => {
    console.log('onUploadFinish:signedResult', signedResult)
    this.props.onUploadFinish(signedResult)
  }

  componentWillMount () {
    const { session } = this.props

    // TODO: change to jwt
    const credentialsString = `${session.email}:${session.token}`
    const base64EncodedCredentials = process.browser
      ? window.btoa(credentialsString)
      : Buffer.from(credentialsString).toString('base64')
    this.basicCredentials = `Basic ${base64EncodedCredentials}`
  }

  render () {
    return (
      <div className='upload'>

        <p>{this.props.label}</p>

        <ReactS3Uploader
          server={config.api.storiesUrl}
          signingUrl='/s3/sign'
          signingUrlHeaders={{ Authorization: this.basicCredentials }}
          accept={this.props.mimeType}
          onProgress={this.onUploadProgress}
          onError={this.onUploadError}
          onFinish={this.onUploadFinish}
          multiple={this.props.multiple}
        />

        <ProgressBar completed={this.state.progress} />

        <style jsx>{`
          p { font-size: 14px; }
          .upload { margin: 15px 0; }
        `}</style>

      </div>
    )
  }
}
