import React, { useState, useEffect } from 'react'

import StoriesList from '../stories-list'
import PageSelector from '../page-selector'
import ErrorBoundary from '../error-boundary'
import { findStories } from '../../lib/strapi-query'

export const LIMIT_PER_PAGE = 20

function StoryList({
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onPlayClick,
  countStories,
  query,
  queryParam,
  header,
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [stories, setStories] = useState([])
  // Page is 1-indexed, but the API query is 0 indexed.
  const [page, setPage] = useState(1)
  const [numStories, setNumStories] = useState(-1)

  const findAndSetStories = async () => {
    setNumStories(await countStories())
    let response = await findStories(
      query,
      queryParam,
      page - 1,
      LIMIT_PER_PAGE
    )
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
      {header && (
        <>
          <h1>{header}</h1>
          <br />
        </>
      )}
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
        numPages={Math.ceil(numStories / LIMIT_PER_PAGE)}
        goToPage={goToPage}
      />
    </ErrorBoundary>
  )
}

export default StoryList
