import { useRouter } from 'next/router'
import React from 'react'

import StoryList from '../../components/hoc/story-list'
import Page from '../../components/hoc/page'
import { countStoriesByTag } from '../../lib/strapi-query'
import config from '../../config'

function TagPage({
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onPlayClick,
}) {
  const router = useRouter()
  const { tag } = router.query

  const { tag: tagQuery } = config.api.queries
  const countStories = () => countStoriesByTag(tag)
  const header = `Tagged: ${tag}`

  return (
    <StoryList
      openStory={openStory}
      isPlaying={isPlaying}
      playingStory={playingStory}
      onStoryClick={onStoryClick}
      onPlayClick={onPlayClick}
      countStories={countStories}
      query={tagQuery}
      queryParam={tag}
      header={header}
    />
  )
}

export default Page(TagPage)
