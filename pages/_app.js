import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

import withApolloClient from '../lib/with-apollo-client'
import Player from '../components/player'
import config from '../config'

const { s3 } = config

class KchungNews extends App {
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
    const { Component, pageProps, apolloClient } = this.props
    const { playing, playerStory: { audio, title } } = this.state

    const audioUrl = audio && audio.filename && s3.rootUrl + audio.filename

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component
            {...pageProps}
            onStoryPlayClick={this.onStoryPlayClick}
          />
          {audioUrl && (
            <Player
              audioUrl={audioUrl}
              title={title}
              playing={playing}
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
