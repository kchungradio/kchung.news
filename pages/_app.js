import React, { useState } from 'react'
import Player from '../components/player'
import App from 'next/app'
import Head from 'next/head'
import config from '../config'

function KchungNewsApp({ Component, pageProps }) {
  const [pageTitle, setPageTitle] = useState('')
  const [pageDescription, setPageDescription] = useState(
    config.pageDescriptions.default
  )
  const [openStory, setOpenStory] = useState({ id: '' })
  const [isPlaying, setIsPlaying] = useState(false)
  const [playingStory, setPlayingStory] = useState({ audio: {} })

  const { audio, title } = playingStory
  const { url: audioUrl } = audio

  const handleStoryClick = (story) => {
    setOpenStory((prevOpenStory) => {
      console.log(story)
      return prevOpenStory?.id !== story.id ? story : { id: '' }
    })
  }

  const handleStoryPlayClick = (story) => {
    // if it's the same story, toggle
    // if it's a different story, play it
    setIsPlaying((prevIsPlaying) =>
      playingStory.id === story.id ? !prevIsPlaying : true
    )
    setPlayingStory(story)
  }

  return (
    <>
      <Head>
        <title>
          {pageTitle ? `${pageTitle} | ` : ''}
          {config.defaultPageTitle}
        </title>
        <meta name="description" content={pageDescription} />
      </Head>

      <Component
        {...pageProps}
        openStory={openStory}
        isPlaying={isPlaying}
        playingStory={playingStory}
        onStoryClick={handleStoryClick}
        onPlayClick={handleStoryPlayClick}
        setPageTitle={setPageTitle}
        setPageDescription={setPageDescription}
      />

      {audioUrl && (
        <Player
          audioUrl={audioUrl}
          title={title}
          isPlaying={isPlaying}
          setPlayState={setIsPlaying}
          togglePlayPause={() => setIsPlaying((p) => !p)}
        />
      )}
    </>
  )
}

KchungNewsApp.getInitialProps = async (appContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default KchungNewsApp
