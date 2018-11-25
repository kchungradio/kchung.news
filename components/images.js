import React, { Component } from 'react'
import Lightbox from 'react-images'

import config from '../config'

export default class Images extends Component {
  state = {
    lightboxIsOpen: false,
    currentImage: 0
  }

  openLightbox = i => {
    this.setState({
      lightboxIsOpen: true,
      currentImage: i
    })
  }
  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false
    })
  }

  prevImage = () => {
    this.setState(prevState => ({ currentImage: prevState.currentImage - 1 }))
  }
  nextImage = () => {
    this.setState(prevState => ({ currentImage: prevState.currentImage + 1 }))
  }

  render () {
    const { images, onDelete } = this.props
    const { lightboxIsOpen, currentImage } = this.state

    if (!images || !Array.isArray(images)) return null

    const imageObjects = images.map(image => ({
      src: config.s3.rootUrl + image.filename
    }))

    return (
      <React.Fragment>
        {images.map((image, idx) => (
          <div key={image.filename} onClick={() => this.openLightbox(idx)}>
            <img src={config.s3.rootUrl + image.filename} />
            {onDelete && (
              <span onClick={() => onDelete(image.id)}>&times;</span>
            )}
          </div>
        ))}

        <Lightbox
          images={imageObjects}
          isOpen={lightboxIsOpen}
          onClose={this.closeLightbox}
          currentImage={currentImage}
          onClickPrev={this.prevImage}
          onClickNext={this.nextImage}
          backdropClosesModal
        />

        <style jsx>{`
          div {
            display: inline-block;
            position: relative;
          }
          img {
            width: 150px;
          }
          span {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
