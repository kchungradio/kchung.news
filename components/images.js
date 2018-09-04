import config from '../config'

export default ({ images, onDelete }) => (
  <div>
    {images &&
      images.map(image => (
        <div key={image.filename}>
          <img src={config.s3.rootUrl + image.filename} />
          {onDelete && <span onClick={() => onDelete(image.id)}>&times;</span>}
        </div>
      ))}

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
  </div>
)
