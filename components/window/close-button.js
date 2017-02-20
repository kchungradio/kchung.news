import React from 'react'

const closeIcon = '✕'

export default () => (
  <div className='close-button'>

    <div className={'inner'}>{closeIcon}</div>

    <style jsx>{`
      .close-button {
        width: 19px;
        height: 19px;
        box-sizing: border-box;
        border: 1px solid #979797;
      }
      .inner {
        height: 100%;
        text-align: center;
        color: darkgrey;
        background: #d8d8d8;
        box-sizing: border-box;
        border: solid white;
        border-width: 2px 1px 0 1px;
        color: #4a4a4a;
      }
    `}</style>

  </div>
)
