import { Component } from 'react'
import { format, parseISO } from 'date-fns'
import Router from 'next/router'
import debounce from 'lodash.debounce'

import Images from './images'

// TODO: use react-transition group
// https://reactcommunity.org/react-transition-group

const StoryDetails = ({ story, isPlaying, onPlayClick, onClick }) => (
  <div className="details">
    {story.audio && (
      <img
        className="play-button"
        alt="play button"
        src={`/${isPlaying ? 'pause' : 'play'}.svg`}
        onClick={() => onPlayClick(story)}
        onKeyDown={(e) => e.key === 'Enter' && onPlayClick(story)}
        tabIndex={0}
      />
    )}

    <button
      onClick={() => {
        Router.push('/story/[story]', `/story/${story.slug}`)
        onClick({ id: '' })
      }}
    >
      Read
    </button>

    {story.location && <h4 className="location">{story.location}</h4>}

    <p className="description">{story.description}</p>

    <Images images={story.photos} />

    <style jsx>{`
      .details {
        padding-bottom: 15px;
        user-select: text;
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
        user-select: none;
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
    const debounceStoryClick = debounce(() => onClick(story), 200)
    return (
      <div className="story">
        <div
          className="story-main"
          onFocus={debounceStoryClick}
          onClick={debounceStoryClick}
          tabIndex={0}
        >
          <span className="author">{story.author}</span>

          <span className="date">
            {story.date ? format(parseISO(story.date), 'MMMM do, yyyy') : '---'}
          </span>

          <span className="title">{story.title}</span>

          <span>
            {story.series && (
              <>
                {' '}
                Series:{' '}
                <button
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation()
                    Router.push(
                      '/series/[series]',
                      `/series/${story.series.seriesName}`
                    )
                  }}
                  onFocus={(e) => e.stopPropagation()}
                >
                  {story.series.seriesName}
                </button>
              </>
            )}
          </span>
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
            user-select: none;
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
