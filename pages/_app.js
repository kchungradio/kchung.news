import React, { useState } from 'react'
import App from 'next/app'
import { useToggle } from 'react-use'

import Player from '../components/player'

function KchungNewsApp({ Component, pageProps }) {
  const [openStory, setOpenStory] = useState(null)
  const [isPlaying, toggleIsPlaying] = useToggle(false)
  const [playingStory, setPlayingStory] = useState({ audio: { url: '' } })

  const {
    title,
    audio: { url: audioUrl }
  } = playingStory

  const handleStoryClick = story => {
    setOpenStory(prevOpenStory =>
      // if it's the same story, close the story
      prevOpenStory !== story.id ? story.id : null
    )
  }

  const handleStoryPlayClick = story => {
    // if it's the same story, toggle
    // if it's a different story, play it
    toggleIsPlaying(prevIsPlaying =>
      playingStory.id === story.id ? !prevIsPlaying : true
    )
    setPlayingStory(story)
  }

  return (
    <>
      <Component
        {...pageProps}
        openStory={openStory}
        isPlaying={isPlaying}
        playingStory={playingStory}
        onStoryClick={handleStoryClick}
        onStoryPlayClick={handleStoryPlayClick}
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

KchungNewsApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default KchungNewsApp
