import Story from '../components/story'
import React, { useState, useEffect } from 'react'

export default function StoriesList({
  getStories,
  isUsersStory,
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onStoryPlayClick
}) {
  const [stories, setStories] = useState({})

  useEffect(() => {
    getStories().then(data => {
      setStories(data)
    })
  })
  if (!stories || !stories.length) return <div>Loading...</div>

  return stories.map(story => (
    <Story
      key={story.id}
      story={story}
      isUsersStory={() => isUsersStory(story)}
      showDetails={story.id === openStory}
      isPlaying={isPlaying && story.id === playingStory.id}
      onClick={onStoryClick}
      onPlayClick={onStoryPlayClick}
    />
  ))
}
