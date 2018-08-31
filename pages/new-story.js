import React from 'react'
import { Mutation, withApollo } from 'react-apollo'

import { Router } from '../routes'

import { addStory } from '../graphql/mutations'

import SecurePage from '../components/hoc/secure-page'
import StoryForm from '../components/forms/story-form'

function NewStoryPage ({ session, client }) {
  return <Mutation mutation={addStory}>
    {(addStory, { loading, error, data }) => (
      <React.Fragment>
        <StoryForm
          session={session}
          onSubmit={story => {
            addStory({ variables: { story } })
              .then(res => {
                console.log('res', JSON.stringify(res))
                Router.pushRoute('channel', { authorSlug: session.slug })
                client.resetStore()
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
}

export default SecurePage(withApollo(NewStoryPage))
