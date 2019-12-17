import React from 'react'
import { Mutation, withApollo } from 'react-apollo'
import Router from 'next/router'

import { addStory } from '../graphql/mutations'

import SecurePage from '../components/hoc/secure-page'
import StoryForm from '../components/forms/story-form'

function NewStoryPage({ session, client }) {
  return (
    <Mutation mutation={addStory}>
      {(addStory, { loading, error }) => (
        <React.Fragment>
          <StoryForm
            session={session}
            onSubmit={story => {
              addStory({ variables: { story } })
                .then(res => {
                  console.log('res', JSON.stringify(res))
                  Router.push('/')
                  client.resetStore()
                })
                .catch(err => {
                  console.error('error', JSON.stringify(err))
                })
            }}
            onCancel={() => Router.push('/')}
            loading={loading}
          />
          {error && <div>There was an error.</div>}
        </React.Fragment>
      )}
    </Mutation>
  )
}

export default SecurePage(withApollo(NewStoryPage))
