import React, { useState, useEffect } from 'react'
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
  const [stories, setStories] = useState([])

  const findAndSetStories = async () => {
    let response = await findStories()
    setStories(response.data)
  }

  useEffect(() => {
    findAndSetStories()
  }, [])

  return (
    <React.Fragment>
      {session && <SessionButtons />}
      <ErrorBoundary>
        <StoriesList
          stories={stories}
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
