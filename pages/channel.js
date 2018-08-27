import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import SessionButtons from '../components/session-buttons'
import StoriesList from '../components/stories-list'
import Page from '../components/hoc/page'

// query.authorSlug comes from url defined in ../routes.js
Channel.getInitialProps = async ({ query: { authorSlug } }) => ({ authorSlug })

function Channel ({
  session,
  authorSlug,
  onStoryPlayClick
}) {
  const isUsersPage = session && (authorSlug === session.slug)

  return (
    <React.Fragment>
      {isUsersPage && <SessionButtons />}

      <Query query={authorStories} variables={{ slug: authorSlug }}>
        {({ loading, error, data }) => {
          if (error) return <div>Error loading stories.</div>
          if (loading) return <div>Loading...</div>

          return <StoriesList
            stories={data.storiesByAuthorSlug}
            isUsersStory={story => session && session.id === story.author.id}
            onStoryPlayClick={onStoryPlayClick}
          />
        }}
      </Query>
    </React.Fragment>
  )
}

const authorStories = gql`
  query StoriesByAuthorSlug ($slug: String!) {
    storiesByAuthorSlug (slug: $slug) {
      id
      title
      slug
      description
      location
      publishedAt
      audio { filename }
      images { filename }
      author { id, name }
    }
  }
`

export default Page(Channel)
