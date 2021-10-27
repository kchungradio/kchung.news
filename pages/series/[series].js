import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import StoriesList from '../../components/stories-list'
import Page from '../../components/hoc/page'
import { getSeriesByName, getStoriesBySeries } from '../../lib/strapi-query'

function SeriesPage({
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onPlayClick,
}) {
  const router = useRouter()
  let { seriesName } = router.query
  const [isLoading, setIsLoading] = useState(true)
  const [stories, setStories] = useState([])
  const [series, setSeries] = useState({})

  const findAndSetSeries = async () => {
    seriesName = router.query.series
    let newSeries = await getSeriesByName(seriesName)
    let response = await getStoriesBySeries(seriesName)
    setSeries(newSeries)
    setStories(response)
    setIsLoading(false)
  }

  useEffect(() => {
    findAndSetSeries()
  }, [])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="section-head">
        <h1>{`Series: ${series?.seriesName}`}</h1>
        <p className="description">{series?.description}</p>
      </div>
      <StoriesList
        stories={stories}
        openStory={openStory}
        isPlaying={isPlaying}
        playingStory={playingStory}
        onStoryClick={onStoryClick}
        onPlayClick={onPlayClick}
      />
      <style jsx>{`
        .section-head {
          margin: 0 0 30px 0;
          border: solid 1px black;
          padding: 10px 0 10px 0;
        }
      `}</style>
    </>
  )
}

export default Page(SeriesPage)
