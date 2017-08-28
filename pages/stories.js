import { Component } from 'react'
import { Router } from '../routes'
import request from 'axios'

import Page from '../components/page'
import Story from '../components/story'
import config from '../config'

class NewsBody extends Component {
  static async getInitialProps ({ query }) {
    // query.authorSlug comes from ../routes.js
    const { authorSlug } = query

    // set request parameters based on query
    let options = {}
    if (authorSlug) {
      options.params = { authorSlug }
    }

    // get stories from api
    const res = await request.get(config.api.storiesUrl, options)

    // sort by date descending
    const stories = res.data.slice().sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    )

    return { slug: authorSlug, stories }
  }

  render () {
    const { session, slug, stories } = this.props

    return (
      <div>

        {slug === session.slug && (
          <button
            className='small'
            onClick={() => Router.pushRoute('/new-story')}
          >
            New Story
          </button>
        )}

        {stories.length === 0 && (
          <span>No stories here...</span>
        )}

        {stories.map(story =>
          <Story
            key={`${story.author}-${story.date}`}
            story={story}
          />
        )}

      </div>
    )
  }
}

export default Page(NewsBody)