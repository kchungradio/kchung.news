import React from 'react'
import { useRouter } from 'next/router'
import { Query } from 'react-apollo'

import { storiesByAuthorSlug } from '../../graphql/queries'

import SessionButtons from '../../components/session-buttons'
import StoriesList from '../../components/stories-list'
import Page from '../../components/hoc/page'

function ChannelPage({
  session,
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onStoryPlayClick
}) {
  const router = useRouter()
  const { author } = router.query

  const isUsersPage = session && author === session.slug

  return (
    <React.Fragment>
      {isUsersPage && <SessionButtons />}

      <Query query={storiesByAuthorSlug} variables={{ slug: author }}>
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
