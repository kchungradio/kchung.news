import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Page from '../../components/hoc/page'
import StoryList from '../../components/hoc/story-list'
import { countStoriesBySeries } from '../../lib/strapi-query'
import config from '../../config'
import SeriesHeader from './seriesHeader'

function SeriesPage({
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onPlayClick,
  setPageTitle,
  setPageDescription,
}) {
  const router = useRouter()
  const [seriesName, setSeriesName] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const { series: seriesQuery } = config.api.queries
  const queryString = seriesQuery + seriesName
  const countStories = () => countStoriesBySeries(seriesName)

  const findAndSetSeriesName = async () => {
    const newSeriesName = router.query.series
    setSeriesName(newSeriesName)
    setPageTitle(newSeriesName)
    setPageDescription(`${newSeriesName} ${config.pageDescriptions.default}`)
    setIsLoading(false)
  }

  useEffect(() => {
    findAndSetSeriesName()
  }, [])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <SeriesHeader seriesName={seriesName} />
      <StoryList
        openStory={openStory}
        isPlaying={isPlaying}
        playingStory={playingStory}
        onStoryClick={onStoryClick}
        onPlayClick={onPlayClick}
        countStories={countStories}
        queryString={queryString}
      />
    </>
  )
}

export default Page(SeriesPage)
