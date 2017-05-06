import { Component } from 'react'
import ReactPlayer from 'react-player'

import Duration from './duration'

export default class Player extends Component {
  state = {
    playing: false,
    played: 0,
    loaded: 0,
    duration: 0
  }

  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  onProgress = state => {
    // only update time slider if not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  render () {
    const { url, title, streaming } = this.props
    const { playing, played, duration } = this.state

    return (
      <div className='player'>
        <ReactPlayer
          ref={player => { this.player = player }}
          className='react-player'
          width='0'
          height='0'
          url={url}
          playing={playing}
          onReady={() => console.log('onReady')}
          onStart={() => console.log('onStart')}
          onPlay={() => this.setState({ playing: true })}
          onPause={() => this.setState({ playing: false })}
          onBuffer={() => console.log('onBuffer')}
          onEnded={() => this.setState({ playing: false })}
          onError={e => console.log('onError', e)}
          onProgress={this.onProgress}
          onDuration={duration => this.setState({ duration })}
        />

        <img className='play-button'
          src={`/static/${playing ? 'pause' : 'play'}.svg`}
          onClick={this.playPause}
        />

        <div className='stack'>
          <div className='title'>
            <span>{title}</span>
          </div>

          {!streaming &&
            <Duration
              className='duration'
              seconds={duration}
            />
          }

          <input
            type='range' min={0} max={1} step='any'
            value={played}
            onMouseDown={this.onSeekMouseDown}
            onChange={this.onSeekChange}
            onMouseUp={this.onSeekMouseUp}
          />
        </div>

        {/* input[type=range] css generated with
          http://danielstern.ca/range.css */}
        <style jsx>{`
          .player {
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 70px;
            min-width: 500px;
            box-sizing: border-box;
            border-top: 1px solid white;
            background: red;
          }
          img {
            width: 55px;
            cursor: pointer;
            margin: 0 15px;
          }
          .stack {
            width: 100%;
            margin-right: 15px;
          }
          .title {
            position: absolute;
            top: 1px;
          }
          :global(.duration) {
            position: absolute;
            top: 2px;
            right: 15px;
            font-size: 14px;
          }

          input[type=range] {
            -webkit-appearance: none;
            width: 100%;
            margin: 11.5px 0;
          }
          input[type=range]:focus {
            outline: none;
          }
          input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 26px;
            cursor: pointer;
            box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
            background: #fff;
            border-radius: 0px;
            border: 0px solid #f00;
            border-width: 12px 0;
          }
          input[type=range]::-webkit-slider-thumb {
            box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
            border: 0px solid #000000;
            height: 25px;
            width: 2px;
            border-radius: 0px;
            background: #fff;
            cursor: pointer;
            -webkit-appearance: none;
            margin-top: -11.5px;
          }
          input[type=range]:focus::-webkit-slider-runnable-track {
            background: #fff;
          }
          input[type=range]::-moz-range-track {
            width: 100%;
            height: 2px;
            cursor: pointer;
            box-shadow: 0px 0px 1px #000000, 0px 0px 0px #0d0d0d;
            background: #fff;
            border-radius: 0px;
            border: 0px solid #f00;
            border-width: 12px 0;
          }
          input[type=range]::-moz-range-thumb {
            box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
            border: 0px solid #000000;
            height: 25px;
            width: 2px;
            border-radius: 0px;
            background: #fff;
            cursor: pointer;
          }
          input[type=range]::-ms-track {
            width: 100%;
            height: 2px;
            cursor: pointer;
            background: transparent;
            border-color: transparent;
            color: transparent;
          }
          input[type=range]::-ms-fill-lower {
            background: #e60000;
            border: 0px solid #f00;
            border-width: 12px 0;
            border-radius: 0px;
            box-shadow: 0px 0px 1px #000000, 0px 0px 0px #0d0d0d;
          }
          input[type=range]::-ms-fill-upper {
            background: #fff;
            border: 0px solid #f00;
            border-width: 12px 0;
            border-radius: 0px;
            box-shadow: 0px 0px 1px #000000, 0px 0px 0px #0d0d0d;
          }
          input[type=range]::-ms-thumb {
            box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
            border: 0px solid #000000;
            height: 25px;
            width: 2px;
            border-radius: 0px;
            background: #fff;
            cursor: pointer;
            height: 2px;
          }
          input[type=range]:focus::-ms-fill-lower {
            background: #fff;
          }
          input[type=range]:focus::-ms-fill-upper {
            background: #fff;
          }
        `}</style>
      </div>
    )
  }
}
