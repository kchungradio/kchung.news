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
    audio {
      id
      filename
      originalFilename
    }
    images {
      id
      filename
      originalFilename
    }
    author {
      id
      name
    }
  }
`
