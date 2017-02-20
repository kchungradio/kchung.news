import React, { Component } from 'react'
import Draggable from 'react-draggable'

import { getDurationString } from '../../lib/utils'

class Transport extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isDragging: false,
      playheadPosition: {x: 0, y: -19}
    }

    this.onPlayheadDragStart = this.onPlayheadDragStart.bind(this)
    this.onPlayheadDragStop = this.onPlayheadDragStop.bind(this)
    this.getPlaybarWidth = this.getPlaybarWidth.bind(this)
    this.setPlayheadPosition = this.setPlayheadPosition.bind(this)
    this.setPlayheadPositionAndTime = this.setPlayheadPositionAndTime.bind(this)
    this.barOnMouseDownHandler = this.barOnMouseDownHandler.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { currentTime, duration } = nextProps

    if (this.playbar && this.playhead) {
      const playbarWidth = this.getPlaybarWidth()
      const position = (currentTime / duration) * playbarWidth

      if (!this.state.isDragging) {
        this.setPlayheadPosition(position)
      }
    }
  }

  onPlayheadDragStart (e, draggableData) {
    this.setState({ isDragging: true })
  }

  onPlayheadDragStop (e, draggableData) {
    // position <= 1 forces 0 since draggable doesn't drop on zero
    const position = draggableData.x > 1 ? draggableData.x : 0
    const playbarWidth = this.getPlaybarWidth()
    const duration = this.props.duration
    const seconds = (position / playbarWidth) * duration

    this.setPlayheadPosition(position)
    this.props.setTime(seconds)
    this.setState({ isDragging: false })
  }

  getPlaybarWidth () {
    return this.playbar.offsetWidth - this.playhead.offsetWidth
  }

  setPlayheadPosition (position) {
    const x = position
    const y = this.state.playheadPosition.y

    this.setState({ playheadPosition: { x, y } })
  }

  setPlayheadPositionAndTime (position) {
    const playbarWidth = this.getPlaybarWidth()
    const duration = this.props.duration
    const seconds = (position / playbarWidth) * duration

    this.setPlayheadPosition(position)
    this.props.setTime(seconds)
  }

  barOnMouseDownHandler (e) {
    const relativeX = e.clientX - e.target.getBoundingClientRect().left
    const position = relativeX - (this.playhead.offsetWidth / 2)
    this.setPlayheadPositionAndTime(position)
  }

  render () {
    const { currentTime, duration } = this.props

    return (
      <div className='transport'>

        <div className='playbar-container' onMouseDown={this.barOnMouseDownHandler} >
          <div className='playbar' ref={playbar => { this.playbar = playbar }} />
        </div>

        <Draggable
          axis='x'
          bounds='parent'
          offsetParent={this.playbar}
          position={this.state.playheadPosition}
          onStart={this.onPlayheadDragStart}
          onStop={this.onPlayheadDragStop}
        >
          <div className='playhead' ref={playhead => { this.playhead = playhead }} />
        </Draggable>

        <div className='time'>
          {getDurationString(currentTime)}
          {isFinite(duration) && ' / ' + getDurationString(duration)}
        </div>

        <style jsx>{`
          .transport {
            position: relative;
            height: 100%;
          }
          .playbar-container {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            height: 37px;
          }
          .playbar {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            height: 7px;
            background: white;
          }
          .playhead {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 9px;
            height: 37px;
            background: white;
            box-sizing: border-box;
            border: 1px solid black;
          }
          .time {
            position: absolute;
            top: 15px;
            right: 0;
          }
        `}</style>

      </div>
    )
  }
}

export default Transport
