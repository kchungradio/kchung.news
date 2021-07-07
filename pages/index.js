import React from 'react'

import StoriesList from '../components/stories-list'
import Page from '../components/hoc/page'

function StoriesPage({
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onStoryPlayClick
}) {
  return (
    <StoriesList
      stories={[]}
      openStory={openStory}
      isPlaying={isPlaying}
      playingStory={playingStory}
      onStoryClick={onStoryClick}
      onStoryPlayClick={onStoryPlayClick}
    />
  )
}

export default Page(StoriesPage)
