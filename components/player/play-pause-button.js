import React from 'react'

const PlayPauseButton = ({ isPlaying, onPlayPauseClick }) => {
  const renderButton = () => (
    isPlaying ? renderPause() : renderPlay()
  )

  const renderPause = () => (
    <svg width='108'>
      <rect
        x='43' y='26'
        width='14' height='46'
        stroke='white' fill='none'
      />
      <rect
        x='61' y='26'
        width='14' height='46'
        stroke='white' fill='none'
      />
    </svg>
  )

  const renderPlay = () => (
    <svg width='108'>
      <polygon
        points='43 26, 43 72, 89 49'
        stroke='white'
        fill='none'
      />
    </svg>
  )

  return (
    <div className='play-pause' onClick={onPlayPauseClick}>

      {renderButton()}

      <style jsx>{`
        .play-pause {
          cursor: pointer;
        }
      `}</style>

    </div>
  )
}

PlayPauseButton.propTypes = {
  isPlaying: React.PropTypes.bool.isRequired,
  onPlayPauseClick: React.PropTypes.func.isRequired
}

export default PlayPauseButton
