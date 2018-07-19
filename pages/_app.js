import React from 'react'
import App, { Container } from 'next/app'

import Player from '../components/player'

export default class extends App {
  state = {
    playing: false,
    playerStory: {}
  }

  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  setPlayState = state => this.setState({ playing: state })

  togglePlayPause = () => this.setState(prevState => ({
    playing: !prevState.playing
  }))

  onStoryPlayClick = story => this.setState({
    playing: true,
    playerStory: story
  })

  render () {
    const { Component, pageProps } = this.props
    const { playing, playerStory } = this.state

    return (
      <Container>
        <Component
          {...pageProps}
          onStoryPlayClick={this.onStoryPlayClick}
        />
        {Object.keys(playerStory).length > 0 && (
          <Player
            audioUrl={playerStory.audio && playerStory.audio.publicUrl}
            title={playerStory.title}
            playing={playing}
            setPlayState={this.setPlayState}
            togglePlayPause={this.togglePlayPause}
          />
        )}
      </Container>
    )
  }
}
