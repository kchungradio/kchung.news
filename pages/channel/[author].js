import { useRouter } from 'next/router'
import React from 'react'

import StoryList from '../../components/hoc/story-list'
import Page from '../../components/hoc/page'
import { countStoriesByChannel } from '../../lib/strapi-query'
import config from '../../config'

function ChannelPage({
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onPlayClick,
  setPageTitle,
}) {
  const router = useRouter()
  const { author } = router.query
  const { author: authorQuery } = config.api.queries
  const queryString = authorQuery + author
  const countStories = () => countStoriesByChannel(author)
  const header = `${author}'s channel`
  setPageTitle(header)

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
export default Page(ChannelPage)
