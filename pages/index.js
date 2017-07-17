/* global fetch */

import { Component } from 'react'
import 'isomorphic-fetch'

import Layout from '../layouts/main'
import Story from '../components/story'

import config from '../config'

export default class NewsBody extends Component {
  static async getInitialProps () {
    const res = await fetch(config.api.stories_url)
    const json = await res.json()
    const stories = json.slice().sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    )
    return { stories }
  }

  render () {
    const { stories } = this.props

    return (
      <Layout>
        {stories.map(story =>
          <Story story={story} />
        )}
      </Layout>
    )
  }
}
