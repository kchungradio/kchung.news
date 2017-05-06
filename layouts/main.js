import React from 'react'

import Header from '../components/header'
import Global from '../components/global'

export default ({ playLiveStream, children }) => (
  <div className='background'>
    <Header />

    {children}

    <Global />

    <style jsx>{`
      .background {
        margin-bottom: 99px;
      }
    `}</style>
  </div>
)
