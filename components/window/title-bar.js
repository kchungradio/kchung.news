import React from 'react'

import CloseButton from './close-button'

const TitleBar = ({ title, hideWindows }) => (
  <div className='title-bar'>

    <div className='title'>{title}</div>

    <div className='close-button' onClick={hideWindows}>
      <CloseButton />
    </div>

    <style jsx>{`
      .title-bar {
        position: relative;
        height: 25px;
        color: white;
        background: red;
        background: linear-gradient(to right, red , white)
      }
      .title {
        position: absolute;
        width: calc(100% - 10px);
        white-space: nowrap;
        left: 6px;
        bottom: 6px;
        overflow: hidden;
      }
      .close-button {
        position: absolute;
        right: 0;
        top: 1px;
        cursor: default;
      }
    `}</style>

  </div>
)

TitleBar.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default TitleBar
