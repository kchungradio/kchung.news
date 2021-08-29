import React, { useState } from 'react'
import { useToggle } from 'react-use'
import Player from '../components/player'
import App from 'next/app'
import Router from 'next/router'

function KchungNewsApp({ Component, pageProps }) {
  const [isPlaying, toggleIsPlaying] = useToggle(false)
  const [playingStory, setPlayingStory] = useState({ audio: {} })

  const { audio, title } = playingStory
  const { url: audioUrl } = audio

  const handleStoryClick = (story) => {
    Router.push('/story/[story]', `/story/${story.slug}`)
  }

  const handleStoryPlayClick = (story) => {
    // if it's the same story, toggle
    // if it's a different story, play it
    toggleIsPlaying((prevIsPlaying) =>
      playingStory.id === story.id ? !prevIsPlaying : true
    )
    setPlayingStory(story)
  }

  return (
    <>
      <Component
        {...pageProps}
        onStoryClick={handleStoryClick}
        onPlayClick={handleStoryPlayClick}
      />

      {audioUrl && (
        <Player
          audioUrl={audioUrl}
          title={title}
          isPlaying={isPlaying}
          setPlayState={toggleIsPlaying}
          togglePlayPause={toggleIsPlaying}
        />
      )}
    </>
  )
}

KchungNewsApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default KchungNewsApp
