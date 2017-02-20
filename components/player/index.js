/* global Audio */

import React, { Component } from 'react'

import PlayPauseButton from './play-pause-button'
import Transport from './transport'

class Player extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      isPlaying: false,
      duration: 0,
      currentTime: 0
    }

    this.setCurrentTime = this.setCurrentTime.bind(this)
    this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this)
  }

  componentDidMount () {
    // TODO: validate url
    // if !isFinite(this.audio.duration), it's a live stream

    this.audio = new Audio(this.props.url)

    this.audio.ondurationchange = () => this.setState({ duration: this.audio.duration })
    this.audio.ontimeupdate = () => this.setState({ currentTime: this.audio.currentTime })
    this.audio.onloadstart = () => this.setState({ isLoading: true })
    this.audio.oncanplaythrough = () => this.setState({ isLoading: false })
    this.audio.onended = () => this.setState({ isPlaying: false })
    this.audio.onerror = () => console.error(this.audio.error)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.url && this.audio.src !== nextProps.url) {
      this.audio.src = nextProps.url
      this.audio.load()
      this.audio.play()
      this.setState({ isPlaying: true })
    }
  }

  componentWillUnmount () {
    if (this.audio) {
      this.audio.pause()
      this.audio.src = ''
      this.audio.load()
    }
  }

  setCurrentTime (seconds) {
    if (this.audio && isFinite(this.audio.duration)) {
      this.audio.currentTime = seconds
      this.setState({ currentTime: seconds })
    }
  }

  handlePlayPauseClick () {
    this.state.isPlaying ? this.audio.pause() : this.audio.play()
    this.setState({ isPlaying: !this.state.isPlaying })
  }

  render () {
    const { hide, children } = this.props
    return (
      <div
        className='player'
        style={hide ? { display: 'none' } : {}}
      >

        <div className='button'>
          <PlayPauseButton
            isPlaying={this.state.isPlaying}
            onPlayPauseClick={this.handlePlayPauseClick}
          />
        </div>

        <div className='info'>
          {/* this.audio && isFinite(this.audio.duration)
            ? <Info episode={episode} />
            :
          */}
          {children}
        </div>

        <div className='transport'>
          <Transport
            currentTime={this.state.currentTime}
            duration={this.state.duration}
            setTime={this.setCurrentTime}
          />
        </div>

        <style jsx>{`
          .player {
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 99px;
            min-width: 500px;
            box-sizing: border-box;
            border-top: 1px solid white;
            background: red;
          }
          .button {
            flex: 0 0 108px;
            height: 100%;
          }
          .info {
            width: 25%;
            height: 100%;
          }
          .transport {
            width: 55%;
            height: 100%;
          }
        `}</style>

      </div>
    )
  }
}

Player.propTypes = {
  children: React.PropTypes.element.isRequired,
  url: React.PropTypes.string
}

export default Player
