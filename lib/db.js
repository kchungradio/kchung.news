/* global fetch */
import 'isomorphic-fetch'
import qs from 'qs'

import config from '../config'

export const getStories = async () => {
  const ghostQueryParams = {
    client_id: 'ghost-frontend',
    client_secret: config.ghost.client_secret,
    fields: 'id,title,slug,published_at,author',
    include: 'author'
  }
  const queryString = qs.stringify(ghostQueryParams)
  const queryUrl = `${config.ghost.api_url}posts/?${queryString}`

  const res = await fetch(queryUrl)
  const json = await res.json()
  const stories = json.posts

  const storiesFlat = stories.map(story => ({
    id: story.id,
    title: story.title,
    slug: story.slug,
    published_at: story.published_at,
    author: story.author.name
  }))

  return storiesFlat
}

export const getStoryBySlug = async (slug) => {
  const ghostQueryParams = {
    client_id: 'ghost-frontend',
    client_secret: config.ghost.client_secret,
    fields: 'id,title,slug,published_at,author',
    include: 'author'
  }
  const queryString = qs.stringify(ghostQueryParams)
  const queryUrl =
    `${config.ghost.api_url}posts/slug/${slug}?${queryString}`

  const res = await fetch(queryUrl)
  const json = await res.json()
  const story = json.posts[0]

  return story
}
