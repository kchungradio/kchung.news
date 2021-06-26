import React from 'react'
import { useRouter } from 'next/router'
import { getStoryBySlug } from '../../lib/strapi-query'
import Page from '../../components/hoc/page'

function ViewStoryPage() {
  const router = useRouter()
  const { story: storySlug } = router.query
  getStoryBySlug(storySlug)

  return <h1>This is a title</h1>
}

export default Page(ViewStoryPage)
