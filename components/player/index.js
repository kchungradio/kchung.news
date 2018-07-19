import { Component } from 'react'
import ReactPlayer from 'react-player'

import Duration from './duration'
import config from '../../config'

const { primary, secondary } = config.colors

export default class Player extends Component {
  state = {
    playedPercent: 0,
    playedSeconds: 0,
    duration: 0
  }

  onProgress = ({ played: playedPercent, playedSeconds }) => {
    // only update time slider if not currently seeking
    if (!this.state.seeking) {
      this.setState({ playedPercent, playedSeconds })
    }
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ playedPercent: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  render () {
    const { audioUrl, title, playing, setPlayState, togglePlayPause } = this.props
    const { playedPercent, playedSeconds, duration } = this.state

    return (
      <div className='player'>
        <ReactPlayer
          ref={player => { this.player = player }}
          className='react-player'
          width='0'
          height='0'
          url={audioUrl}
          playing={playing}
          onReady={() => console.log('onReady')}
          onStart={() => console.log('onStart')}
          onPlay={() => setPlayState(true)}
          onPause={() => setPlayState(false)}
          onBuffer={() => console.log('onBuffer')}
          onEnded={() => setPlayState(false)}
          onError={e => console.log('onError', e)}
          onProgress={this.onProgress}
          onDuration={duration => this.setState({ duration })}
          fileConfig={{forceAudio: true}}
          progressFrequency={1000}
        />

        <img
          className='play-button'
          src={`/static/${playing ? 'pause' : 'play'}.svg`}
          onClick={togglePlayPause}
        />

        <div className='stack'>
          <div className='title'>
            <span>{title}</span>
          </div>

          <Duration seconds={playedSeconds} />
          /
          <Duration seconds={duration} />

          <input
            type='range' min={0} max={1} step='any'
            value={playedPercent}
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
            left: 0;
            width: 100%;
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
            background: ${primary};
            border-radius: 0px;
            border: 0px solid ${secondary};
            border-width: 12px 0;
          }
          input[type=range]::-webkit-slider-thumb {
            box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
            border: 0px solid #000000;
            height: 25px;
            width: 2px;
            border-radius: 0px;
            background: ${primary};
            cursor: pointer;
            -webkit-appearance: none;
            margin-top: -11.5px;
          }
          input[type=range]:focus::-webkit-slider-runnable-track {
            background: ${primary};
          }
          input[type=range]::-moz-range-track {
            width: 100%;
            height: 2px;
            cursor: pointer;
            box-shadow: 0px 0px 1px #000000, 0px 0px 0px #0d0d0d;
            background: ${primary};
            border-radius: 0px;
            border: 0px solid ${secondary};
            border-width: 12px 0;
          }
          input[type=range]::-moz-range-thumb {
            box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
            border: 0px solid #000000;
            height: 25px;
            width: 2px;
            border-radius: 0px;
            background: ${primary};
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
            border: 0px solid ${secondary};
            border-width: 12px 0;
            border-radius: 0px;
            box-shadow: 0px 0px 1px #000000, 0px 0px 0px #0d0d0d;
          }
          input[type=range]::-ms-fill-upper {
            background: ${primary};
            border: 0px solid ${secondary};
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
            background: ${primary};
            cursor: pointer;
            height: 2px;
          }
          input[type=range]:focus::-ms-fill-lower {
            background: ${primary};
          }
          input[type=range]:focus::-ms-fill-upper {
            background: ${primary};
          }
        `}</style>
      </div>
    )
  }
}
