import React from 'react'
import Head from 'next/head'

import GlobalStyle from '../components/global-style'
import Header from '../components/header'
import NavIcons from '../components/nav-icons'

export default ({ playLiveStream, children }) => (
  <div className='background'>

    <Head>
      <title>KCHUNG News Body</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
    </Head>

    <Header />
    <NavIcons onPlayClick={playLiveStream} />
    {children}
    <GlobalStyle />

    <style jsx>{`
      .background {
        margin-bottom: 99px;
      }
    `}</style>

  </div>
)
