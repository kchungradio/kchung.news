import React from 'react'
import { Query } from 'react-apollo'

import { allStories } from '../graphql/queries'

import SessionButtons from '../components/session-buttons'
import StoriesList from '../components/stories-list'
import Page from '../components/hoc/page'

function StoriesPage ({
  session,
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onStoryPlayClick
}) {
  return (
    <React.Fragment>
      {session && <SessionButtons />}

      <Query query={allStories}>
        {({ loading, error, data }) => {
          if (error) return <div><i>Error loading stories.</i></div>
          if (loading) return <div><i>Loading...</i></div>

          return <StoriesList
            stories={data.stories}
            isUsersStory={story => session && session.id === story.author.id}
            openStory={openStory}
            isPlaying={isPlaying}
            playingStory={playingStory}
            onStoryClick={onStoryClick}
            onStoryPlayClick={onStoryPlayClick}
          />
        }}
      </Query>
    </React.Fragment>
  )
}

export default Page(StoriesPage)
