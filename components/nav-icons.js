import React from 'react'

export default ({ onPlayClick }) => (
  <div className='navigation'>

    <div id='play' className='icon' onClick={onPlayClick}>
      <svg className='play' fill='white' viewBox='0 0 100 90'>
        <path d='M22.6,23.6c0-3.5,3.8-5.7,6.8-3.9l22.9,13.2L75.2,46c3,1.7,3,6.1,0,7.9L52.3,67.1L29.4,80.4c-3,1.8-6.8-0.4-6.8-3.9l0-26.4  L22.6,23.6z' />
      </svg>
      <p>live stream</p>
    </div>

    <div id='archive' className='icon' onClick={/* go to archive page */}>
      <svg fill='white' viewBox='0 0 75.9 59.6'>
        <path d='M50.2,2.9L64.9,0l11,56.7l-14.7,2.9L50.2,2.9L50.2,2.9z M63.8,49.4c0.3,1.6,1.9,2.7,3.6,2.4  c1.6-0.3,2.7-1.9,2.4-3.6c-0.3-1.6-1.9-2.7-3.6-2.4C64.6,46.1,63.5,47.7,63.8,49.4L63.8,49.4z M55.7,8.3l3.7,19l6.1-1.2l-3.7-19  L55.7,8.3L55.7,8.3z M4.4,8.2v19.4h6.2V8.2H4.4L4.4,8.2z M4.4,50c0,1.7,1.4,3,3,3c1.7,0,3-1.4,3-3c0-1.7-1.4-3-3-3  C5.8,47,4.4,48.3,4.4,50L4.4,50z M0,1.8h14.9v57.8H0V1.8L0,1.8z M21.9,8.2v19.4h6.2V8.2H21.9L21.9,8.2z M22,50c0,1.7,1.4,3,3,3  c1.7,0,3-1.4,3-3c0-1.7-1.4-3-3-3C23.4,47,22,48.3,22,50L22,50z M17.6,1.8h14.9v57.8H17.6V1.8L17.6,1.8z M38.5,8l2,19.3l6.2-0.7  l-2-19.3L38.5,8L38.5,8z M43,49.6c0.2,1.7,1.7,2.9,3.3,2.7c1.7-0.2,2.9-1.7,2.7-3.3c-0.2-1.7-1.7-2.9-3.3-2.7  C44,46.4,42.8,47.9,43,49.6L43,49.6z M33.5,2.1l14.9-1.6l6,57.5l-14.9,1.6L33.5,2.1L33.5,2.1z' />
      </svg>
      <p>archive</p>
    </div>

    <style jsx>{`
      .navigation {
        width: 100px;
      }
      .icon {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-top: 25px;
        cursor: pointer;
      }
      .icon:first-child {
        padding-top: 0;
      }
      .icon:last-child {
        padding-bottom: 20px;
      }
      img, svg {
        width: 46px;
      }
      p {
        margin-top: 5px;
      }
      a, a:hover {
        color: white;
        background: red;
        text-decoration: none;
        text-align: center;
      }
      svg.play {
        width: 70px;
      }
      svg.donate {
        width: 40px;
      }
      svg.upload {
        width: 40px;
      }
    `}</style>

  </div>
)
