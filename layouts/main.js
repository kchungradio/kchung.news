import React from 'react'

import Global from '../components/global'

export default ({ playLiveStream, children }) => (
  <div className='background'>
    <Global />

    <div className='main'>
      {children}
    </div>

    <style jsx>{`
      .background {
        margin-bottom: 99px;
      }

      .main {
        padding: 40px;
      }
    `}</style>
  </div>
)
