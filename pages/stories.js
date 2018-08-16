import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Router } from '../routes'
import Page from '../components/hoc/page'
import Story from '../components/story'

function Stories ({
  session,
  onStoryPlayClick
}) {
  return (
    <div>
      {session && (
        <div>
          <button onClick={() => Router.pushRoute('new-story')}>
            New Story
          </button>
          <button onClick={() => Router.pushRoute('edit-profile')}>
            Edit Profile
          </button>
        </div>
      )}

      <Query query={allStories}>
        {({ loading, error, data }) => {
          if (error) return <div>Error loading stories.</div>
          if (loading) return <div>Loading...</div>

          const stories = data.stories

          if (!stories.length) return <div>No stories here...</div>

          return stories.map(story => (
            <Story
              key={story.id}
              story={story}
              isUsersStory={session && session.id === story.author.id}
              onPlayClick={onStoryPlayClick}
            />
          ))
        }}
      </Query>

      <style jsx>{`
        button {
          margin: 0 10px 10px 0;
        }
      `}</style>
    </div>
  )
}

const allStories = gql`{
  stories {
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
}`

export default Page(Stories)
