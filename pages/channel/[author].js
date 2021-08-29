import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import StoriesList from '../../components/stories-list'
import Page from '../../components/hoc/page'
import { getStoriesByChannel } from '../../lib/strapi-query'

function ChannelPage({ onStoryClick }) {
  const router = useRouter()
  const { author } = router.query
  const [isLoading, setIsLoading] = useState(true)
  const [stories, setStories] = useState([])

  const findAndSetStories = async () => {
    let response = await getStoriesByChannel(author)
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
      <h1>{`${author}'s channel`}</h1>
      <br />
      <StoriesList stories={stories} onStoryClick={onStoryClick} />
    </>
  )
}

export default Page(ChannelPage)
