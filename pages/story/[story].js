import React, { useEffect, useState } from 'react'
import { useToggle } from 'react-use'
import { useRouter } from 'next/router'
import { format, parseISO } from 'date-fns'
import { getStoryBySlug } from '../../lib/strapi-query'
import Page from '../../components/hoc/page'
import Player from '../../components/player'
import Images from '../../components/images'

function ViewStoryPage() {
  const router = useRouter()
  const { story: storySlug } = router.query
  const [story, setStory] = useState({
    audio: {
      url: ''
    }
  })
  const [isPlaying, toggleIsPlaying] = useToggle(false)

  const findAndSetStory = async () => {
    let response = await getStoryBySlug(storySlug)
    setStory(response)
  }

  useEffect(() => {
    findAndSetStory()
  }, [])

  return story ? (
    <>
      <button
        onClick={e => {
          e.stopPropagation()
          router.push('/')
        }}
      >
        back
      </button>
      <h1>{story.title}</h1>
      <h2>
        {story.date ? format(parseISO(story.date), 'MMMM do, yyyy') : '---'}
      </h2>
      <h3>{story.location}</h3>
      <br />
      <h4>{story.author}</h4>
      <br />
      <p>{story.body}</p>
      <br />
      <Images images={story.photos} />

      {story.audio && story.audio.url && (
        <Player
          audioUrl={story.audio.url}
          title={story.title}
          isPlaying={isPlaying}
          setPlayState={toggleIsPlaying}
          togglePlayPause={toggleIsPlaying}
        />
      )}

      <style jsx>{`
        Images {
          padding: 10px;
        }
      `}</style>
    </>
  ) : (
    <div>Loading...</div>
  )
}

export default Page(ViewStoryPage)
