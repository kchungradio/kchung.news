/* global fetch */

import { Component } from 'react'
import 'isomorphic-fetch'

import wrapWithLayout from '../components/wrapWithLayout'
import Story from '../components/story'

import config from '../config'

class NewsBody extends Component {
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
      <div>
        {stories.map(story =>
          <Story story={story} />
        )}
      </div>
    )
  }
}

export default wrapWithLayout(NewsBody)
