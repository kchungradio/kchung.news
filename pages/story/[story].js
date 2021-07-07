import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getStoryBySlug } from '../../lib/strapi-query'
import Page from '../../components/hoc/page'

function ViewStoryPage() {
  const router = useRouter()
  const { story: storySlug } = router.query

  const [story, setStory] = useState()

  const findAndSetStory = async () => {
    let response = await getStoryBySlug(storySlug)
    setStory(response)
  }

  useEffect(() => {
    findAndSetStory()
  }, [])

  return story ? (
    <>
      <button
        onClick={e => {
          e.stopPropagation()
          router.push('/')
        }}
      >
        back
      </button>
      <h1>{story.title}</h1>
      <h2>
        {story.date}, {story.location}
      </h2>
      <h3>{story.author}</h3>
      <p>{story.body}</p>
    </>
  ) : (
    <div>Loading...</div>
  )
}

export default Page(ViewStoryPage)
