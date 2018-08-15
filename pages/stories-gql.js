import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Router } from '../routes'
import Page from '../components/hoc/page'
import Story from '../components/story'

Stories.getInitialProps = async ({ query: { authorSlug } }) => {
  // query.authorSlug comes from url defined in ../routes.js
  return { authorSlug }
}

function Stories ({
  data: { loading, error, stories },
  session,
  onStoryPlayClick
}) {
  if (error) return <div className='error'>Error loading stories.</div>
  if (loading) return <div>Loading...</div>

  let authorSlug
  const isHome = !authorSlug
  const isUsersPage = session && (authorSlug === session.slug)
  const noStories = stories && stories.length === 0

  return (
    <div>
      {session && (isHome || isUsersPage) && (
        <div>
          <button onClick={() => Router.pushRoute('new-story')}>
            New Story
          </button>
          <button onClick={() => Router.pushRoute('edit-profile')}>
            Edit Profile
          </button>
        </div>
      )}

      <div>
        {noStories && <p>No stories here...</p>}
        {stories.map(story => (
          <Story
            key={story.id}
            story={story}
            isUsersStory={session && session.id === story.author.id}
            onPlayClick={onStoryPlayClick}
          />
        ))}
      </div>

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
    published_at
    audio { filename }
    images { filename }
    author { id, name }
  }
}`

export default graphql(allStories)(Page(Stories))
