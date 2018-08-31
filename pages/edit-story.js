import React from 'react'
import { Query, Mutation, withApollo } from 'react-apollo'

import { Router } from '../routes'

import { storyBySlug } from '../graphql/queries'
import { updateStory, deleteStory } from '../graphql/mutations'

import SecurePage from '../components/hoc/secure-page'
import StoryForm from '../components/forms/story-form'

const EditStory = ({ session, slug, client }) => (
  <Query query={storyBySlug} variables={{ slug }}>
    {({ loading, error, data }) => {
      if (error) return <div>Error loading stories.</div>
      if (loading) return <div>Loading...</div>

      return <Mutation mutation={updateStory}>
        {(updateStory, { loading, error }) => (
          <Mutation mutation={deleteStory}>
            {(deleteStory, { loading2, error2 }) => (
              <React.Fragment>
                <StoryForm
                  session={session}
                  storyToEdit={data.story}
                  onSubmit={story => {
                    updateStory({ variables: { id: data.story.id, story } })
                      .then(res => {
                        console.log('res', JSON.stringify(res))
                        Router.pushRoute('channel', { authorSlug: slug })
                      })
                      .catch(handleError)
                  }}
                  onDelete={id => {
                    if (window.confirm('Are you sure you want to delete this story?')) {
                      deleteStory({ variables: { id } })
                        .then(res => {
                          console.log('res', JSON.stringify(res))
                          Router.pushRoute('channel', { authorSlug: slug })
                          client.resetStore()
                        })
                        .catch(handleError)
                    }
                  }}
                  onCancel={() => Router.pushRoute('stories')}
                  loading={loading || loading2}
                />
                {(error || error2) && <div>There was an error.</div>}
              </React.Fragment>
            )}
          </Mutation>
        )}
      </Mutation>
    }}
  </Query>
)

EditStory.getInitialProps = async ({ query: { storySlug } }) => ({ slug: storySlug })

function handleError (err) {
  console.error('error', JSON.stringify(err))
}

export default SecurePage(withApollo(EditStory))
