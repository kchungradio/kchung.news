import { Component } from 'react'
import { format, parseISO } from 'date-fns'
import Router from 'next/router'

import Images from './images'

// TODO: use react-transition group
// https://reactcommunity.org/react-transition-group

// TODO: prevent double click text selection:
// https://stackoverflow.com/a/28726111

const StoryDetails = ({ story, isPlaying, onPlayClick, onClick }) => (
  <div className="details">
    <img
      className="play-button"
      src={`/${isPlaying ? 'pause' : 'play'}.svg`}
      onClick={() => onPlayClick(story)}
    />

    <button
      onClick={() => {
        Router.push('/story/[story]', `/story/${story.slug}`)
        onClick({ id: '' })
      }}
    >
      Read
    </button>

    {story.location && <div className="location">{story.location}</div>}

    <div className="description">{story.description}</div>

    <Images images={story.photos} />

    {/*
    {story.series && (
      <div className='series'>
        Series: {story.series}
      </div>
    )}
    */}

    {/*
    {story.tags && (
      <div className='tags'>
        {story.tags.map(tag => `#${tag}`).join(' ')}
      </div>
    )}
    */}

    <style jsx>{`
      .details {
        padding-bottom: 15px;
      }
      img {
        width: 40px;
        height: 40px;
        margin: 5px 0 -4px 0;
        cursor: pointer;
      }
      button {
        font-size: 20px;
        height: 40px;
        vertical-align: top;
        margin: 5px 0 0 10px;
      }
      .description,
      .location {
        font-size: 0.875em;
        margin-top: 5px;
      }
    `}</style>
  </div>
)

class Story extends Component {
  render() {
    const { story, showDetails, isPlaying, onClick, onPlayClick } = this.props
    return (
      <div className="story">
        <div className="story-main" onClick={() => onClick(story)}>
          <span className="author">{story.author}</span>

          <span className="date">
            {story.date ? format(parseISO(story.date), 'MMMM do, yyyy') : '---'}
          </span>

          <span className="title">{story.title}</span>

          {/* <h4>
            {story.series && (
              <>
                {' '}
                Series:{' '}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    Router.push(
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
                        Router.push('/tag/[tag]', `/tag/${tag.tagName}`)
                      }}
                    >
                      {tag.tagName}
                    </button>
                  </Fragment>
                ))}
              </>
            )}
          </h4> */}
        </div>

        {showDetails && (
          <StoryDetails
            story={story}
            isPlaying={isPlaying}
            onPlayClick={onPlayClick}
            onClick={onClick}
          />
        )}

        <style jsx>{`
          .story {
            margin-bottom: 10px;
          }
          .story-main {
            cursor: pointer;
          }
          .title {
            margin-right: 30px;
          }
          .date,
          .author {
            display: inline-block;
            margin-right: 30px;
            font-size: 0.875em;
          }

          @media (max-width: 500px) {
            .story {
              margin-bottom: 15px;
            }
            .date,
            .author {
              display: block;
              width: inherit;
              text-align: inherit;
              font-size: 0.875em;
              margin-bottom: 3px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Story
