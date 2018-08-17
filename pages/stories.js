import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import SessionButtons from '../components/session-buttons'
import StoriesList from '../components/stories-list'
import Page from '../components/hoc/page'

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

          return <StoriesList
            stories={data.stories}
            isUsersStory={story => session.id === story.author.id}
            onStoryPlayClick={onStoryPlayClick}
          />
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
