/* global fetch */

import React, { Component } from 'react'
import 'isomorphic-fetch'

import config from '../config'
import Layout from '../components/layout'
import Window from '../components/window'
import EpisodeList from '../components/bodies/episode-list'
import EpisodeDetail from '../components/bodies/episode-detail'
import Donate from '../components/bodies/donate'
import About from '../components/bodies/about'
import Player from '../components/player'
import Info from '../components/player/info'

const liveStreamEpisode = {
  title: 'live stream',
  audio: {
    url: config.voscast.url
  }
}

export default class NewsBody extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showEpisodeList: true,
      showEpisodeDetail: false,
      showDonate: false,
      showAbout: false,
      hidePlayer: false,
      episodeForDetail: {},
      episodeForPlayer: liveStreamEpisode
    }

    this.renderWindow = this.renderWindow.bind(this)
    this.renderEpisodeList = this.renderEpisodeList.bind(this)
    this.renderEpisodeDetail = this.renderEpisodeDetail.bind(this)
    this.renderDonate = this.renderDonate.bind(this)
    this.renderAbout = this.renderAbout.bind(this)
    this.handleShowWindowClick = this.handleShowWindowClick.bind(this)
    this.handleHideWindowClick = this.handleHideWindowClick.bind(this)
    this.showEpisodeDetail = this.showEpisodeDetail.bind(this)
    this.playEpisode = this.playEpisode.bind(this)
    this.playLiveStream = this.playLiveStream.bind(this)
    this.getAudioUrl = this.getAudioUrl.bind(this)
  }

  static async getInitialProps () {
    const res = await fetch(config.db.apiUrl)
    const json = await res.json()
    const episodes = json.slice().sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    )
    return { episodes }
  }

  render () {
    return (
      <Layout
        showWindow={this.handleShowWindowClick}
        playLiveStream={this.playLiveStream}
      >
        {this.renderWindow()}
        <Player
          hide={this.state.hidePlayer}
          url={this.getAudioUrl()}
        >
          <Info episode={this.state.episodeForPlayer} />
        </Player>
      </Layout>
    )
  }

  getAudioUrl () {
    if (this.state.episodeForPlayer.audio) {
      const audio = this.state.episodeForPlayer.audio
      if (audio.filename) return config.s3.rootUrl + audio.filename
      else return audio.url
    }
  }

  renderWindow () {
    return (
      <div>
        {this.state.showEpisodeList && this.renderEpisodeList()}
        {this.state.showEpisodeDetail && this.renderEpisodeDetail()}
        {this.state.showDonate && this.renderDonate()}
        {this.state.showAbout && this.renderAbout()}
        <style jsx>{`
          :global(.background) { min-height: 558px; }
        `}</style>
      </div>
    )
  }

  renderEpisodeList () {
    const dimensions = { width: 523, height: 408 }
    const position = { left: 150, top: 130 }

    return (
      <div style={position}>
        <Window
          width={dimensions.width}
          height={dimensions.height}
          title='Recent Broadcasts'
          hideWindows={this.handleHideWindowClick}
        >
          <EpisodeList
            episodes={this.props.episodes}
            showEpisodeDetail={this.showEpisodeDetail}
            playEpisode={this.playEpisode}
          />
        </Window>
        <style jsx>{`
          div { position: absolute; }
        `}</style>
      </div>
    )
  }

  renderEpisodeDetail () {
    const dimensions = { width: 700, height: 600 }
    const position = { left: 300, top: 60 }

    return (
      <div style={position}>
        <Window
          width={dimensions.width}
          height={dimensions.height}
          title={this.state.episodeForDetail.title}
          hideWindows={this.handleHideWindowClick}
        >
          <EpisodeDetail
            episode={this.state.episodeForDetail}
            playEpisode={this.playEpisode}
          />
        </Window>
        <style jsx>{`
          div {
            position: absolute;
            z-index: 10;
          }
          :global(.background) { height: 660px !important; }
        `}</style>
      </div>
    )
  }

  renderDonate () {
    const dimensions = { width: 476, height: 357 }
    const position = { left: 200, top: 150 }

    return (
      <div style={position}>
        <Window
          width={dimensions.width}
          height={dimensions.height}
          title='Donate'
          hideWindows={this.handleHideWindowClick}
        >
          <Donate />
        </Window>
        <style jsx>{`
          div { position: absolute; }
        `}</style>
      </div>
    )
  }

  renderAbout () {
    const dimensions = { width: 476, height: 228 }
    const position = { left: 185, top: 180 }

    return (
      <div style={position}>
        <Window
          width={dimensions.width}
          height={dimensions.height}
          title='About'
          hideWindows={this.handleHideWindowClick}
        >
          <About />
        </Window>
        <style jsx>{`
          div { position: absolute; }
        `}</style>
      </div>
    )
  }

  showEpisodeDetail (event, episode) {
    event.stopPropagation()
    this.setState({
      showEpisodeDetail: true,
      episodeForDetail: episode
    })
  }

  playLiveStream () {
    // TODO: join this fn with this.playEpisode
    this.setState({
      episodeForPlayer: liveStreamEpisode,
      hidePlayer: false
    })
  }

  playEpisode (event, episode) {
    // TODO: join this fn with this.playLiveStream
    event.stopPropagation()
    this.setState({
      episodeForPlayer: episode,
      hidePlayer: false
    })
  }

  handleShowWindowClick (event) {
    const id = event.currentTarget.id
    const windowNames = ['list', 'detail', 'donate', 'about']

    switch (id) {
      case 'archive':
        this.setState({
          showEpisodeList: true,
          showEpisodeDetail: false,
          showDonate: false,
          showAbout: false
        })
        break
      case 'detail':
        this.setState({
          showEpisodeList: true,
          showEpisodeDetail: true,
          showDonate: false,
          showAbout: false
        })
        break
      case 'donate':
        this.setState({
          showEpisodeList: false,
          showEpisodeDetail: false,
          showDonate: true,
          showAbout: false
        })
        break
      case 'about':
        this.setState({
          showEpisodeList: false,
          showEpisodeDetail: false,
          showDonate: false,
          showAbout: true
        })
        break
      default:
        throw Error(`Windows include: ${windowNames}`)
    }
  }

  handleHideWindowClick (event) {
    if (this.state.showEpisodeDetail) {
      this.setState({
        showEpisodeList: true,
        showEpisodeDetail: false,
        showDonate: false,
        showAbout: false
      })
    } else {
      this.setState({
        showEpisodeList: false,
        showEpisodeDetail: false,
        showDonate: false,
        showAbout: false
      })
    }
  }
}
