import React, { Component } from 'react'
import {Carousel} from 'react-responsive-carousel';

export default class Images extends Component {
  state = {
    lightboxIsOpen: false,
    currentImage: 0,
  }

  openLightbox = (i) => {
    this.setState({
      lightboxIsOpen: true,
      currentImage: i,
    })
  }
  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false,
    })
  }
  prevImage = () => {
    this.setState((prevState) => ({ currentImage: prevState.currentImage - 1 }))
  }
  nextImage = () => {
    this.setState((prevState) => ({ currentImage: prevState.currentImage + 1 }))
  }

  render() {
    const { images, onDelete } = this.props
    const { lightboxIsOpen, currentImage } = this.state

    if (!images || !Array.isArray(images)) return null

    const imageObjects = images.map(({ url, alternativeText, caption }) => ({
      src: url,
      alt: alternativeText,
      title: caption,
    }))

    return (
      <React.Fragment>
        <ul>
          {images.map((image, idx) => (
            <li
              key={`${image.filename}-${idx}`}
              onClick={() => this.openLightbox(idx)}
            >
              <img
                src={image.formats ? image.formats.thumbnail.url : ''}
                alt={image.alternativeText}
                title={image.caption}
                tabIndex={0}
              />
              {onDelete && (
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(image.id)
                  }}
                >
                  &times;
                </span>
              )}
            </li>
          ))}
        </ul>

        <Carousel>
          {imageObjects.map(image => (
            <div>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </Carousel>

        <style jsx>{`
          ul,
          li {
            padding: 0;
            margin: 0;
          }
          ul {
            overflow-y: hidden;
            white-space: nowrap;
          }
          li {
            display: inline-block;
            margin-right: 14px;
            cursor: pointer;
            position: relative;
          }
          img {
            height: 100px;
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
