import { Component } from 'react'

import config from '../config'
import { getStories } from '../lib/db'

import MainLayout from '../layouts/main'
import Header from '../components/header'
import RecentStories from '../components/recent-stories'
import Player from '../components/player'

export default class NewsBody extends Component {
  state = {
    player: {
      title: 'live stream',
      url: config.voscast.url,
      stream: true
    }
  }

  static async getInitialProps () {
    const stories = await getStories()
    return { stories }
  }

  render () {
    const { stories } = this.props
    return (
      <div>
        <MainLayout>
          <Header />
          <br />
          <br />
          <RecentStories stories={stories} />
        </MainLayout>

        <Player {...this.state.player} />
      </div>
    )
  }
}
