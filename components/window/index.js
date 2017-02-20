import React from 'react'

import TitleBar from './title-bar'

const Window = ({ width, height, title, hideWindows, children }) => {
  const boxSize = { width, height }

  return (
    <div className='window' style={boxSize}>

      <TitleBar title={title} hideWindows={hideWindows} />

      <div className='window-inner'>
        <div className='window-body'>
          {children}
        </div>
      </div>

      <style jsx>{`
        .window {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          border: solid #d9d9d9;
          border-width: 2px 3px 2px 2px;
          box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.60);
        }
        .window-inner {
          display: flex;
          height: 100%;
          box-sizing: border-box;
          border: 1px solid #979797;
          border-left: 1px solid #adadad;
        }
        .window-body {
          flex: 1;
          color: black;
          overflow-y: auto;
          box-sizing: border-box;
          border-left: 1px solid #e4e4e4;
          background: white;
        }
      `}</style>

    </div>
  )
}

Window.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired
}

export default Window
