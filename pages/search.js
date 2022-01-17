import React, { useEffect, useState } from 'react'

import StoriesList from '../components/stories-list'
import Page from '../components/hoc/page'
import PageSelector from '../components/page-selector'
import { LIMIT_PER_PAGE } from '../components/hoc/story-list'
import { countStoriesBySearch, getStoriesBySearch } from '../lib/strapi-query'
import { pageDescriptions } from '../config'

function SearchPage({
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onPlayClick,
  setPageTitle,
  setPageDescription,
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [stories, setStories] = useState([])
  const [query, setQuery] = useState('')
  // Page is 1-indexed, but the API query is 0 indexed.
  const [page, setPage] = useState(1)
  const [numStories, setNumStories] = useState(-1)
  setPageTitle('')
  setPageDescription(pageDescriptions.default)

  const findAndSetStories = async () => {
    setNumStories(await countStoriesBySearch(query))
    let response = await getStoriesBySearch(query)
    setStories(response)
    setIsLoading(false)
  }

  const goToPage = (n) => {
    if (n > 0 && n <= Math.ceil(numStories / LIMIT_PER_PAGE)) {
      setStories([])
      setIsLoading(true)
      setPage(n)
    }
  }

  useEffect(() => {
    setPage(1)
    findAndSetStories()
  }, [query])

  useEffect(() => {
    findAndSetStories()
  }, [page])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h3>{`Search stories: `}</h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <br />
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
    </>
  )
}

export default Page(SearchPage)
