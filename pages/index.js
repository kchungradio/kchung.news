/* global fetch */

import { Component } from 'react'
import 'isomorphic-fetch'

import MainLayout from '../layouts/main'
import Header from '../components/header'
import Story from '../components/story'
import Player from '../components/player'

import config from '../config'
const apiUrl = config.db.api_url

export default class NewsBody extends Component {
  state = {
    player: {
      title: 'live stream',
      url: config.voscast.url,
      stream: true
    }
  }

  static async getInitialProps () {
    const res = await fetch(apiUrl)
    const json = await res.json()
    const stories = json.slice().sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    )
    return { stories }
  }

  render () {
    const { stories } = this.props

    return (
      <div>
        <MainLayout>

          <Header />
          <br />

          {stories.map(story =>
            <Story story={story} />
          )}

        </MainLayout>

        <Player {...this.state.player} />
      </div>
    )
  }
}
