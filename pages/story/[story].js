import React, { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import { format, parseISO } from 'date-fns'
import { getStoryBySlug } from '../../lib/strapi-query'
import Page from '../../components/hoc/page'
import Images from '../../components/images'

function StoryPage({ isPlaying, playingStory, onPlayClick, setPageTitle }) {
  const router = useRouter()
  const { story: storySlug } = router.query
  const [isLoading, setIsLoading] = useState(true)
  const [story, setStory] = useState({})

  const isThisStoryPlaying = playingStory.id === story.id && isPlaying

  const findAndSetStory = async () => {
    let response = await getStoryBySlug(storySlug)
    setStory(response)
    setPageTitle(response.title || '')
    setIsLoading(false)
  }

  useEffect(() => {
    findAndSetStory()
  }, [])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h1>
        {story.title}
        {story.audio && (
          <img
            className="play-button"
            src={`/${isThisStoryPlaying ? 'pause' : 'play'}.svg`}
            onClick={() => onPlayClick(story)}
          />
        )}
      </h1>
      <h2>
        {story.date ? format(parseISO(story.date), 'MMMM do, yyyy') : '---'}
      </h2>
      <h3>{story.location}</h3>
      <br />
      <h4>
        <button
          onClick={(e) => {
            e.stopPropagation()
            router.push('/channel/[author]', `/channel/${story.author}`)
          }}
        >
          {story.author}
        </button>
      </h4>
      <br />
      <p>{story.body}</p>
      <br />
      <Images images={story.photos} />
      <br />
      <h4>
        {story.series && (
          <>
            {' '}
            Series:{' '}
            <button
              onClick={(e) => {
                e.stopPropagation()
                router.push(
                  '/series/[series]',
                  `/series/${story.series.seriesName}`
                )
              }}
            >
              {story.series.seriesName}
            </button>
          </>
        )}
        {!!story.tags.length && (
          <>
            {' '}
            Tags:
            {story.tags.map((tag) => (
              <Fragment key={tag.tagId}>
                {' '}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push('/tag/[tag]', `/tag/${tag.tagName}`)
                  }}
                >
                  {tag.tagName}
                </button>
              </Fragment>
            ))}
          </>
        )}
      </h4>

      <style jsx>{`
        Images {
          padding: 10px;
        }

        img {
          width: 40px;
          height: 40px;
          margin: 0 0 -12px 15px;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}

export default Page(StoryPage)
