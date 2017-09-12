import { Component } from 'react'
import moment from 'moment'

// TODO: use react-transition group
// https://reactcommunity.org/react-transition-group

// TODO: prevent double click text selection:
// https://stackoverflow.com/a/28726111

const StoryDetails = ({ story }) => (
  <div className='details'>

    {story.location && (
      <span className='location'>
        {story.location}
      </span>
    )}


    <div className='top-row'>
      <div className='play'>
        play
      </div>
      <div className='description'>
        {story.description}
      </div>
    </div>

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
      .play {
        margin-top: 5px;
      }
      .description {
        font-size: 85%;
        margin-top: 5px;
      }
      .location {
        display: inline-block;
        margin-right: 30px;
        font-size: 85%;
      }

      @media (max-width: 500px) {
        .location {
          display: block;
          width: inherit;
          text-align: inherit;
          font-size: 14px;
          margin-bottom: 3px;
        }
      }
    `}</style>

  </div>
)

class Story extends Component {
  state = {
    showDetails: false
  }

  render () {
    const { story } = this.props
    const { showDetails } = this.state

    return (
      <div
        className='story'
        onClick={() => this.setState({ showDetails: !showDetails })}
      >

        <span className='author'>
          {story.author}
        </span>

        <span className='date'>
          {moment(story.publishedAt).format('MMMM Do, YYYY')}
        </span>

        <div className='title'>
          {story.title}
        </div>

        {showDetails && <StoryDetails story={story} />}

        <style jsx>{`
          .story {
            margin-bottom: 10px;
            cursor: pointer;
          }
          .date, .author {
            display: inline-block;
            margin-right: 30px;
            font-size: 85%;
          }

          @media (max-width: 500px) {
            .story {
              margin-bottom: 15px;
            }
            .date, .author {
              display: block;
              width: inherit;
              text-align: inherit;
              font-size: 14px;
              margin-bottom: 3px;
            }
          }
        `}</style>
      </div>

    )
  }
}

export default Story
