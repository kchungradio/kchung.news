import React from 'react'

import StoriesList from '../components/stories-list'
import Page from '../components/hoc/page'
import ErrorBoundary from '../components/error-boundary'

function StoriesPage({
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onStoryPlayClick
}) {
  return (
    <ErrorBoundary>
      <StoriesList
        stories={[]}
        openStory={openStory}
        isPlaying={isPlaying}
        playingStory={playingStory}
        onStoryClick={onStoryClick}
        onStoryPlayClick={onStoryPlayClick}
      />
    </ErrorBoundary>
  )
}

export default Page(StoriesPage)
