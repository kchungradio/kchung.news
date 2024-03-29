import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

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
  setPageTitle,
  setPageDescription,
}) {
  const router = useRouter()
  const { tag } = router.query

  const { tag: tagQuery } = config.api.queries
  const queryString = tagQuery + tag
  const countStories = () => countStoriesByTag(tag)
  const header = `Tagged: ${tag}`

  useEffect(() => {
    setPageTitle(header)
    setPageDescription(`${header} ${config.pageDescriptions.default}`)
  }, [])

  return (
    <StoryList
      openStory={openStory}
      isPlaying={isPlaying}
      playingStory={playingStory}
      onStoryClick={onStoryClick}
      onPlayClick={onPlayClick}
      countStories={countStories}
      queryString={queryString}
      header={header}
    />
  )
}

export default Page(TagPage)
