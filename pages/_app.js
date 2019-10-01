import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

import withApolloClient from '../lib/with-apollo-client'
import Player from '../components/player'
import config from '../config'

const { s3 } = config

class KchungNews extends App {
  state = {
    openStory: null,
    isPlaying: false,
    playingStory: {}
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  setPlayState = state => this.setState({ isPlaying: state })

  togglePlayPause = () =>
    this.setState(prevState => ({
      isPlaying: !prevState.isPlaying
    }))

  onStoryClick = storyId => {
    this.setState(prevState => ({
      openStory: prevState.openStory !== storyId ? storyId : null
    }))
  }

  onStoryPlayClick = story => {
    // if it's the same story, toggle
    // if it's a different story, just play it
    this.setState(prevState => ({
      isPlaying:
        prevState.playingStory.id === story.id ? !prevState.isPlaying : true,
      playingStory: story
    }))
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props
    const { openStory, isPlaying, playingStory } = this.state
    const { audio, title } = playingStory

    const audioUrl = audio && audio.filename && s3.rootUrl + audio.filename

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component
            {...pageProps}
            openStory={openStory}
            isPlaying={isPlaying}
            playingStory={playingStory}
            onStoryClick={this.onStoryClick}
            onStoryPlayClick={this.onStoryPlayClick}
          />
          {audioUrl && (
            <Player
              audioUrl={audioUrl}
              title={title}
              isPlaying={isPlaying}
              setPlayState={this.setPlayState}
              togglePlayPause={this.togglePlayPause}
            />
          )}
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(KchungNews)
