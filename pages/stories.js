import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import SessionButtons from '../components/session-buttons'
import Page from '../components/hoc/page'
import Story from '../components/story'

function Stories ({
  session,
  onStoryPlayClick
}) {
  return (
    <React.Fragment>
      {session && <SessionButtons />}

      <Query query={allStories}>
        {({ loading, error, data }) => {
          if (error) return <div>Error loading stories.</div>
          if (loading) return <div>Loading...</div>

          const stories = data.stories

          if (!stories.length) return <div>No stories here...</div>

          return stories.map(story => (
            <Story
              key={story.id}
              story={story}
              isUsersStory={session && session.id === story.author.id}
              onPlayClick={onStoryPlayClick}
            />
          ))
        }}
      </Query>
    </React.Fragment>
  )
}

const allStories = gql`{
  stories {
    id
    title
    slug
    description
    location
    publishedAt
    audio { filename }
    images { filename }
    author { id, name }
  }
}`

export default Page(Stories)
