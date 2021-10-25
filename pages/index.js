import React, { useState, useEffect } from 'react'

import StoriesList from '../components/stories-list'
import PageSelector from '../components/page-selector'
import Page from '../components/hoc/page'
import ErrorBoundary from '../components/error-boundary'
import { findStories, countStories } from '../lib/strapi-query'

export const LIMIT_PER_PAGE = 20

function StoriesPage({
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onPlayClick,
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [stories, setStories] = useState([])
  // Page is 1-indexed, but the API query is 0 indexed.
  const [page, setPage] = useState(1)
  const [numStories, setNumStories] = useState(-1)

  const findAndSetStories = async () => {
    setNumStories(await countStories())
    let response = await findStories(page - 1, LIMIT_PER_PAGE)
    setStories(response)
    setIsLoading(false)
  }

  const goToPage = (n) => {
    if (n > 0 && n <= Math.floor(numStories / LIMIT_PER_PAGE) + 1) {
      setStories([])
      setIsLoading(true)
      setPage(n)
    }
  }

  useEffect(() => {
    findAndSetStories()
  }, [page])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ErrorBoundary>
      <StoriesList
        stories={stories}
        openStory={openStory}
        isPlaying={isPlaying}
        playingStory={playingStory}
        onStoryClick={onStoryClick}
        onPlayClick={onPlayClick}
      />
      <PageSelector
        page={page}
        numPages={Math.floor(numStories / LIMIT_PER_PAGE) + 1}
        goToPage={goToPage}
      />
    </ErrorBoundary>
  )
}

export default Page(StoriesPage)
