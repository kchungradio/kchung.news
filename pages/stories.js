import React from 'react'
import { Query } from 'react-apollo'

import { allStories } from '../graphql/queries'

import SessionButtons from '../components/session-buttons'
import StoriesList from '../components/stories-list'
import Page from '../components/hoc/page'

function StoriesPage ({
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
            isUsersStory={story => session && session.id === story.author.id}
            onStoryPlayClick={onStoryPlayClick}
          />
        }}
      </Query>
    </React.Fragment>
  )
}

export default Page(StoriesPage)
