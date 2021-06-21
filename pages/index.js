import React from 'react'

import SessionButtons from '../components/session-buttons'
import StoriesList from '../components/stories-list'
import Page from '../components/hoc/page'
import { findStories } from '../lib/strapi-query'
import ErrorBoundary from '../components/error-boundary'

function StoriesPage({
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
      <ErrorBoundary>
        <StoriesList
          getStories={findStories}
          isUsersStory={story => session && session.id === story.author.id}
          openStory={openStory}
          isPlaying={isPlaying}
          playingStory={playingStory}
          onStoryClick={onStoryClick}
          onStoryPlayClick={onStoryPlayClick}
        />
      </ErrorBoundary>
    </React.Fragment>
  )
}

export default Page(StoriesPage)
