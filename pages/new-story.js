import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Router } from '../routes'
import SecurePage from '../components/hoc/secure-page'
import StoryForm from '../components/forms/story-form'

const addStory = gql`
  mutation AddStory($story: StoryInput!) {
    addStory(input: $story) {
      id
    }
  }
`

const NewStory = ({ session }) => (
  <Mutation mutation={addStory}>
    {(addStory, { loading, error, data }) => (
      <React.Fragment>
        <StoryForm
          session={session}
          onSubmit={story => {
            addStory({ variables: { story } })
              .then(res => {
                console.log('res', JSON.stringify(res))
                Router.pushRoute('channel', { authorSlug: session.slug })
              })
              .catch(err => {
                console.error('error', JSON.stringify(err))
              })
          }}
          onCancel={() => Router.pushRoute('stories')}
          loading={loading}
        />
        {error && <div>There was an error.</div>}
      </React.Fragment>
    )}
  </Mutation>
)

export default SecurePage(NewStory)
