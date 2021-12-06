import React from 'react'
import StoryList from '../components/hoc/story-list'
import Page from '../components/hoc/page'
import { findStories, countStories } from '../lib/strapi-query'

function StoriesPage({
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onPlayClick,
}) {
  return (
    <StoryList
      openStory={openStory}
      isPlaying={isPlaying}
      playingStory={playingStory}
      onStoryClick={onStoryClick}
      onPlayClick={onPlayClick}
      findStories={findStories}
      countStories={countStories}
    />
  )
}
export default Page(StoriesPage)
