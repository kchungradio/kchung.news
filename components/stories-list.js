import Story from '../components/story'

export default function StoriesList({
  stories,
  isPlaying,
  playingStory,
  onStoryClick,
}) {
  if (!stories || !stories.length) return <div>No stories here...</div>

  return stories.map((story) => (
    <Story
      key={story.id}
      story={story}
      isPlaying={isPlaying && story.id === playingStory.id}
      onClick={onStoryClick}
    />
  ))
}
