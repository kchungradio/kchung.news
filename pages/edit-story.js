import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'

import { Router } from '../routes'
import SecurePage from '../components/hoc/secure-page'
import StoryForm from '../components/forms/story-form'

const EditStory = ({ session, slug }) => (
  <Query query={storyBySlug} variables={{ slug }}>
    {({ loading, error, data }) => {
      if (error) return <div>Error loading stories.</div>
      if (loading) return <div>Loading...</div>

      return <Mutation mutation={updateStory}>
        {(updateStory, { loading, error }) => (
          <React.Fragment>
            <StoryForm
              session={session}
              storyToEdit={data.story}
              onSubmit={story => {
                updateStory({ variables: { id: data.story.id, story } })
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
    }}
  </Query>
)

EditStory.getInitialProps = async ({ query: { storySlug } }) => ({ slug: storySlug })

const storyBySlug = gql`
  query StoryBySlug($slug: String!) {
    story: storyBySlug(slug: $slug) {
      id
      title
      slug
      description
      location
      publishedAt
      audio { filename, originalFilename }
      images { filename, originalFilename }
    }
  }
`

const updateStory = gql`
  mutation UpdateStory($id: Int!, $story: StoryUpdateInput!) {
    updateStory(id: $id, input: $story) {
      id
    }
  }
`

export default SecurePage(EditStory)
