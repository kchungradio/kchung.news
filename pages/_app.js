import React, { useState } from 'react'
import App from 'next/app'
import { useToggle } from 'react-use'

import Player from '../components/player'
import config from '../config'

const { s3 } = config

function KchungNewsApp({ Component, pageProps }) {
  const [openStory, setOpenStory] = useState(null)
  const [isPlaying, toggleIsPlaying] = useToggle(false)
  const [playingStory, setPlayingStory] = useState({})

  const { audio, title } = playingStory
  const audioUrl = audio && audio.filename && s3.rootUrl + audio.filename

  const handleStoryClick = storyId => {
    setOpenStory(prevOpenStory =>
      // if it's the same story, close the story
      prevOpenStory !== storyId ? storyId : null
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
