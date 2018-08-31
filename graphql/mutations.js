import gql from 'graphql-tag'

import { storyFragment } from './fragments'

export const addStory = gql`
  mutation AddStory($story: StoryInput!) {
    addStory(input: $story) {
      ...StoryFields
    }
  }
  ${storyFragment}
`

export const updateStory = gql`
  mutation UpdateStory($id: Int!, $story: StoryUpdateInput!) {
    updateStory(id: $id, input: $story) {
      ...StoryFields
    }
  }
  ${storyFragment}
`

export const deleteStory = gql`
  mutation DeleteStory($id: Int!) {
    deleteStory(id: $id) {
      id
    }
  }
`

export const updateAuthorName = gql`
  mutation UpdateAuthorName($id: Int!, $name: String!) {
    updateAuthorName(id: $id, name: $name) {
      id
      name
    }
  }
`
