export default ({ images }) => (
  <div className='images'>
    {images.map(image => (
      <img
        key={image.filename}
        src={image.publicUrl}
      />
    ))}

    <style jsx>{`
      img {
        width: 150px;
      }
    `}</style>
  </div>
)
