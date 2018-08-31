import gql from 'graphql-tag'

export const storyFragment = gql`
  fragment StoryFields on Story {
    id
    title
    slug
    description
    location
    series
    tags
    publishedAt
    audio { filename, originalFilename }
    images { filename, originalFilename }
    author { id, name }
  }
`
