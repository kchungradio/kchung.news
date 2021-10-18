import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import StoriesList from '../../components/stories-list'
import Page from '../../components/hoc/page'
import { getStoriesByTag } from '../../lib/strapi-query'

function TagPage({
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onPlayClick,
}) {
  const router = useRouter()
  const { tag } = router.query
  const [isLoading, setIsLoading] = useState(true)
  const [stories, setStories] = useState([])

  const findAndSetStories = async () => {
    let response = await getStoriesByTag(tag)
    setStories(response)
    setIsLoading(false)
  }

  useEffect(() => {
    findAndSetStories()
  }, [])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h1>{`Tagged: ${tag}`}</h1>
      <br />
      <StoriesList
        stories={stories}
        openStory={openStory}
        isPlaying={isPlaying}
        playingStory={playingStory}
        onStoryClick={onStoryClick}
        onPlayClick={onPlayClick}
      />
    </>
  )
}

export default Page(TagPage)
