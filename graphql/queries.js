import gql from 'graphql-tag'

import { storyFragment } from './fragments'

export const allStories = gql`
  query AllStories {
    stories {
      ...StoryFields
    }
  }
  ${storyFragment}
`

export const storiesByAuthorSlug = gql`
  query StoriesByAuthorSlug($slug: String!) {
    stories: storiesByAuthorSlug(slug: $slug) {
      ...StoryFields
    }
  }
  ${storyFragment}
`

export const storyBySlug = gql`
  query StoryBySlug($slug: String!) {
    story: storyBySlug(slug: $slug) {
      ...StoryFields
    }
  }
  ${storyFragment}
`
