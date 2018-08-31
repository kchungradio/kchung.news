import Story from '../components/story'

export default function StoriesList ({
  stories,
  isUsersStory,
  openStory,
  onStoryClick,
  onStoryPlayClick
}) {
  if (!stories || !stories.length) return <div>No stories here...</div>

  return stories.map(story => (
    <Story
      key={story.id}
      story={story}
      isUsersStory={() => isUsersStory(story)}
      showDetails={story.id === openStory}
      onClick={onStoryClick}
      onPlayClick={onStoryPlayClick}
    />
  ))
}
