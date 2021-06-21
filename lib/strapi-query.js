import axios from 'axios'
import config from '../config'

const { api } = config

export const findStories = async () => {
  const storiesUrl = api.baseUrl + api.endpoints.stories
  const stories = axios.get(storiesUrl)
  return stories
}
