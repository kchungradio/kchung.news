/* global fetch */

import React, { Component } from 'react'
import 'isomorphic-fetch'

import MainLayout from '../layouts/main'
import Header from '../components/header'
import RecentStories from '../components/recent-stories'
import Player from '../components/player'

import config from '../config'
const apiUrl = config.db.api_url

const playerProps = {
  title: 'live stream',
  url: config.voscast.url,
  streaming: true
}

export default class NewsBody extends Component {
  static async getInitialProps () {
    const res = await fetch(apiUrl)
    const json = await res.json()
    const episodes = json.slice().sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    )
    return { episodes }
  }

  render () {
    return (
      <div>
        <MainLayout>
          <Header />
          <br />
          <br />
          <RecentStories />
        </MainLayout>

        <Player {...playerProps} />
      </div>
    )
  }
}
