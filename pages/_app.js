import React, { useState } from 'react'
import Player from '../components/player'
import App from 'next/app'
import Router from 'next/router'

function KchungNewsApp({ Component, pageProps }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playingStory, setPlayingStory] = useState({ audio: {} })

  const { audio, title } = playingStory
  const { url: audioUrl } = audio

  const handleStoryClick = (story) => {
    Router.push('/story/[story]', `/story/${story.slug}`)
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
      <Component
        {...pageProps}
        isPlaying={isPlaying}
        playingStory={playingStory}
        onStoryClick={handleStoryClick}
        onPlayClick={handleStoryPlayClick}
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
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default KchungNewsApp
