import { Component } from 'react'
import PropTypes from 'prop-types'

import ReactS3Uploader from 'react-s3-uploader'

import config from '../../config'

export default class extends Component {
  static propTypes = {
    label: PropTypes.string,
    multiple: PropTypes.bool,
    mimeType: PropTypes.string,
    onUploadFinish: PropTypes.func
  }

  state = {
    progress: null
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

  render () {
    return (
      <div className='upload'>
        <p>{this.props.label}</p>

        <ReactS3Uploader
          server={config.api.s3UrlSigning}
          signingUrl='/s3/sign'
          signingUrlHeaders={{ Authorization: `Bearer ${this.props.token}` }}
          accept={this.props.mimeType}
          onProgress={this.onUploadProgress}
          onError={this.onUploadError}
          onFinish={this.onUploadFinish}
          multiple={this.props.multiple}
        />

        {Number.isInteger(this.state.progress) && (
          <div>{this.state.progress}% uploaded</div>
        )}

        <div>{this.props.children}</div>

        <style jsx>{`
          p {
            font-size: 0.875em;
          }
          .upload {
            margin: 15px 0;
          }
        `}</style>
      </div>
    )
  }
}
