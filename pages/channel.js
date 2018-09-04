import React from 'react'
import { Query } from 'react-apollo'

import { storiesByAuthorSlug } from '../graphql/queries'

import SessionButtons from '../components/session-buttons'
import StoriesList from '../components/stories-list'
import Page from '../components/hoc/page'

// query.authorSlug comes from url defined in ../routes.js
ChannelPage.getInitialProps = async ({ query: { authorSlug } }) => ({
  authorSlug
})

function ChannelPage ({
  session,
  authorSlug,
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onStoryPlayClick
}) {
  const isUsersPage = session && authorSlug === session.slug

  return (
    <React.Fragment>
      {isUsersPage && <SessionButtons />}

      <Query query={storiesByAuthorSlug} variables={{ slug: authorSlug }}>
        {({ loading, error, data }) => {
          if (error) {
            return (
              <div>
                <i>Error loading stories.</i>
              </div>
            )
          }
          if (loading) {
            return (
              <div>
                <i>Loading...</i>
              </div>
            )
          }

          return (
            <StoriesList
              stories={data.stories}
              isUsersStory={story => session && session.id === story.author.id}
              openStory={openStory}
              isPlaying={isPlaying}
              playingStory={playingStory}
              onStoryClick={onStoryClick}
              onStoryPlayClick={onStoryPlayClick}
            />
          )
        }}
      </Query>
    </React.Fragment>
  )
}

export default Page(ChannelPage)
