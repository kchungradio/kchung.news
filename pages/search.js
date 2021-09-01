import React, { useEffect, useState } from 'react'

import StoriesList from '../components/stories-list'
import Page from '../components/hoc/page'
import { getStoriesBySearch } from '../lib/strapi-query'

function SearchPage({ onStoryClick }) {
  const [isLoading, setIsLoading] = useState(true)
  const [stories, setStories] = useState([])
  const [query, setQuery] = useState('')

  const findAndSetStories = async () => {
    let response = await getStoriesBySearch(query)
    setStories(response)
    setIsLoading(false)
  }

  useEffect(() => {
    findAndSetStories()
  }, [query])

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
      <StoriesList stories={stories} onStoryClick={onStoryClick} />
    </>
  )
}

export default Page(SearchPage)
