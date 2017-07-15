import { Component } from 'react'

import Global from '../components/global'
import Header from '../components/header'
// import Player from '../components/player'

import config from '../config'

export default class Main extends Component {
  state = {
    player: {
      title: 'live stream',
      url: config.voscast.url,
      stream: true
    }
  }

  render () {
    return (
      <div className='background'>
        <Global />

        <div className='main'>
          <Header />
          {this.props.children}
        </div>

        {/*
        <Player {...this.state.player} />
        */}

        <style jsx>{`
          .main {
            padding: 30px 40px;
          }
        `}</style>
      </div>
    )
  }
}
