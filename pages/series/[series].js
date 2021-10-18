import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import StoriesList from '../../components/stories-list'
import Page from '../../components/hoc/page'
import { getStoriesBySeries } from '../../lib/strapi-query'

function SeriesPage({
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onPlayClick,
}) {
  const router = useRouter()
  const { series } = router.query
  const [isLoading, setIsLoading] = useState(true)
  const [stories, setStories] = useState([])

  const findAndSetStories = async () => {
    let response = await getStoriesBySeries(series)
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
      <h1>{`Series: ${series}`}</h1>
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

export default Page(SeriesPage)
