import React, { useState, useEffect } from 'react'

import StoriesList from '../components/stories-list'
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
  const [stories, setStories] = useState([])
  const [page, setPage] = useState(0)
  const [numStories, setNumStories] = useState(-1)

  const findAndSetStories = async () => {
    setNumStories(await countStories())
    let response = await findStories(page, LIMIT_PER_PAGE)
    setStories(response)
  }

  const goToPage = (n) => {
    if (n >= 0 && n < numStories / LIMIT_PER_PAGE) {
      setPage(n)
    }
  }

  useEffect(() => {
    findAndSetStories()
  }, [])

  return (
    <ErrorBoundary>
      <StoriesList
        stories={stories}
        openStory={openStory}
        isPlaying={isPlaying}
        playingStory={playingStory}
        onStoryClick={onStoryClick}
        onPlayClick={onPlayClick}
        page={page}
        goToPage={goToPage}
      />
    </ErrorBoundary>
  )
}

export default Page(StoriesPage)
