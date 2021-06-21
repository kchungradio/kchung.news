import Story from '../components/story'
import React, { useState, useEffect } from 'react'
import { findStories } from '../lib/strapi-query'

export default function StoriesList({
  isUsersStory,
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onStoryPlayClick
}) {
  const [stories, setStories] = useState([])

  useEffect(async () => {
    let response = await findStories()
    setStories(response.data)
  }, [])

  return stories.length ? (
    stories.map(story => (
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
  ) : (
    <div>Loading...</div>
  )
}
