import React, { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import { format, parseISO } from 'date-fns'
import { getStoryBySlug } from '../../lib/strapi-query'
import Page from '../../components/hoc/page'
import Images from '../../components/images'
import config from '../../config'

function StoryPage({
  isPlaying,
  playingStory,
  onPlayClick,
  setPageTitle,
  setPageDescription,
}) {
  const router = useRouter()
  const { story: storySlug } = router.query
  const [isLoading, setIsLoading] = useState(true)
  const [story, setStory] = useState({})

  const isThisStoryPlaying = playingStory.id === story.id && isPlaying

  const findAndSetStory = async () => {
    let response = await getStoryBySlug(storySlug)
    setStory(response)
    setPageTitle(response.title || '')
    setPageDescription(response.description || config.pageDescriptions.default)
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
            alt="play button"
            src={`/${isThisStoryPlaying ? 'pause' : 'play'}.svg`}
            onClick={() => onPlayClick(story)}
            onKeyDown={(e) => e.key === 'Enter' && onPlayClick(story)}
            tabIndex={0}
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
          tabIndex={0}
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
              tabIndex={0}
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
                  tabIndex={0}
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
