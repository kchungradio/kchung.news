import Story from '../components/story'
import React from 'react'

export default function StoriesList({
  stories,
  isUsersStory,
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onStoryPlayClick
}) {
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
