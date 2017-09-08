import { Component } from 'react'
import request from 'axios'

import { Router } from '../routes'
import Page from '../components/page'
import Story from '../components/story'
import config from '../config'

class NewsBody extends Component {
  static async getInitialProps ({ query }) {
    // query.authorSlug comes from url defined in ../routes.js
    const { authorSlug } = query

    // set request parameters based on query
    let options = {}
    if (authorSlug) options.params = { authorSlug }

    // get stories from api
    const res = await request.get(config.api.storiesUrl, options)

    // sort by date descending
    const stories = res.data.slice().sort((a, b) =>
      new Date(b.publishedAt) - new Date(a.publishedAt)
    )

    return { authorSlug, stories }
  }

  render () {
    const {
      session,
      url,
      authorSlug,
      stories
    } = this.props

    const isHome = (url.pathname === '/stories') && !authorSlug
    const isUsersPage = session && (authorSlug === session.slug)
    const noStories = stories.length === 0

    return (
      <div>

        {session && (isHome || isUsersPage) && (
          <button
            className='small'
            onClick={() => Router.pushRoute('/new-story')}
          >
            New Story
          </button>
        )}

        {noStories && (
          <p>No stories here...</p>
        )}

        {stories.map(story =>
          <Story
            key={`${story.authorSlug}-${story.createdAt}`}
            story={story}
          />
        )}

      </div>
    )
  }
}

export default Page(NewsBody)
