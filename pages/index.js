/* global fetch */

import { Component } from 'react'
import 'isomorphic-fetch'
import qs from 'qs'

import MainLayout from '../layouts/main'
import Header from '../components/header'
import RecentStories from '../components/recent-stories'
import Player from '../components/player'

import config from '../config'

export default class NewsBody extends Component {
  state = {
    player: {
      title: 'live stream',
      url: config.voscast.url,
      stream: true
    }
  }

  static async getInitialProps () {
    const query = {
      client_id: 'ghost-frontend',
      client_secret: config.ghost.client_secret,
      fields: 'id,title,slug,published_at,author',
      include: 'author'
    }
    const queryString = qs.stringify(query)
    const queryUrl = `${config.ghost.apiUrl}posts/?${queryString}`

    const res = await fetch(queryUrl)
    const json = await res.json()
    const stories = json.posts

    const storiesFlat = stories.map(story => ({
      id: story.id,
      title: story.title,
      slug: story.slug,
      published_at: story.published_at,
      author: story.author.name
    }))
    return { stories: storiesFlat }
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
