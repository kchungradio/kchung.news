import axios from 'axios'
import config from '../config'
import qs from 'qs'

const { api } = config

export const findStories = async () => {
  const storiesUrl = api.baseUrl + api.endpoints.stories
  const stories = await axios.get(storiesUrl)
  return stories.data
}

export const getStoriesByChannel = async (author) => {
  const storiesUrl = api.baseUrl + api.endpoints.stories + '?author=' + author
  const stories = await axios.get(storiesUrl)
  return stories.data
}

export const getStoriesBySeries = async (series) => {
  const storiesUrl = api.baseUrl + api.endpoints.stories + '?series=' + series
  const stories = await axios.get(storiesUrl)
  return stories.data
}

export const getStoriesByTag = async (tag) => {
  const storiesUrl =
    api.baseUrl + api.endpoints.stories + '?tags.tagName_in=' + tag
  const stories = await axios.get(storiesUrl)
  return stories.data
}

export const getStoryBySlug = async (slug) => {
  const storiesUrl = api.baseUrl + api.endpoints.stories + '?slug=' + slug
  const story = await axios.get(storiesUrl)
  return story.data[0]
}

export const getStoriesBySearch = async (query) => {
  if (!query) return []
  const searchFields = [
    'title',
    'body',
    'author',
    'series',
    'location',
    'tags.tagName',
  ]
  const queryString = qs.stringify({
    _where: {
      _or: searchFields.map((field) => ({ [`${field}_contains`]: query })),
    },
  })
  const storiesUrl = api.baseUrl + api.endpoints.stories + '?' + queryString
  const stories = await axios.get(storiesUrl)
  return stories.data
}
