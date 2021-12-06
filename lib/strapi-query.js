import axios from 'axios'
import config from '../config'
import qs from 'qs'

const { api } = config

export const getSeriesList = async () => {
  const seriesUrl = api.baseUrl + api.endpoints.series
  const series = await axios.get(seriesUrl)
  return series.data
}

export const countSeries = async () => {
  const seriesUrl = api.baseUrl + api.endpoints.countSeries
  const series = await axios.get(seriesUrl)
  return series.data
}

export const getSeriesByName = async (seriesName) => {
  const seriesUrl =
    api.baseUrl + api.endpoints.series + '?seriesName=' + seriesName
  const series = await axios.get(seriesUrl)
  return series.data[0]
}

export const findStories = async (query, queryParam, page, limitPerPage) => {
  const start = limitPerPage * page
  const storiesUrl = `${api.baseUrl}${api.endpoints.stories}${query || ''}${
    queryParam || ''
  }${query ? '&' : '?'}_sort=date:DESC&_start=${start}&_limit=${limitPerPage}`

  const stories = await axios.get(storiesUrl)
  return stories.data
}

export const countStories = async () => {
  const storiesUrl = api.baseUrl + api.endpoints.countStories
  const numStories = await axios.get(storiesUrl)
  return numStories.data
}

export const getStoriesByChannel = async (author) => {
  const storiesUrl = api.baseUrl + api.endpoints.stories + '?author=' + author
  const stories = await axios.get(storiesUrl)
  return stories.data
}

export const countStoriesByChannel = async (author) => {
  const storiesUrl =
    api.baseUrl + api.endpoints.countStories + '?author=' + author
  const numStories = await axios.get(storiesUrl)
  return numStories.data
}

export const getStoriesBySeries = async (series) => {
  const storiesUrl =
    api.baseUrl + api.endpoints.stories + '?series.seriesName_in=' + series
  const stories = await axios.get(storiesUrl)
  return stories.data
}

export const countStoriesBySeries = async (series) => {
  const storiesUrl =
    api.baseUrl + api.endpoints.countStories + '?series.seriesName_in=' + series
  const stories = await axios.get(storiesUrl)
  return stories.data
}

export const getStoriesByTag = async (tag) => {
  const storiesUrl =
    api.baseUrl + api.endpoints.stories + '?tags.tagName_in=' + tag
  const stories = await axios.get(storiesUrl)
  return stories.data
}

export const countStoriesByTag = async (tag) => {
  const storiesUrl =
    api.baseUrl + api.endpoints.countStories + '?tags.tagName_in=' + tag
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
    'description',
    'series.seriesName',
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

export const countStoriesBySearch = async (query) => {
  if (!query) return []
  const searchFields = [
    'title',
    'body',
    'author',
    'description',
    'series.seriesName',
    'location',
    'tags.tagName',
  ]
  const queryString = qs.stringify({
    _where: {
      _or: searchFields.map((field) => ({ [`${field}_contains`]: query })),
    },
  })
  const storiesUrl =
    api.baseUrl + api.endpoints.countStories + '?' + queryString
  const stories = await axios.get(storiesUrl)
  return stories.data
}
