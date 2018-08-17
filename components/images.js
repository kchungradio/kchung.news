import config from '../config'

export default ({ images }) => (
  <div className='images'>
    {images.map(image => (
      <img
        key={image.filename}
        src={config.s3.rootUrl + image.filename}
      />
    ))}

    <style jsx>{`
      img {
        width: 150px;
      }
    `}</style>
  </div>
)
