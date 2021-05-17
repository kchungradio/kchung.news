import Story from '../components/story'

export default function StoriesList({
  stories,
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onStoryPlayClick,
}) {
  if (!stories || !stories.length) return <div>No stories here...</div>

  return stories.map((story) => (
    <Story
      key={story.id}
      story={story}
      showDetails={story.id === openStory}
      isPlaying={isPlaying && story.id === playingStory.id}
      onClick={onStoryClick}
      onPlayClick={onStoryPlayClick}
    />
  ))
}
