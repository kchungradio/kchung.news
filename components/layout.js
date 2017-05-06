import React from 'react'
import Head from 'next/head'

export default ({ playLiveStream, children }) => (
  <div className='background'>

    <Head>
      <title>KCHUNG News Body</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
    </Head>

    {children}

    <style jsx>{`
      .background {
        margin-bottom: 99px;
      }
    `}</style>

  </div>
)
