import { Component } from 'react'
import moment from 'moment'

// TODO: use react-transition group
// https://reactcommunity.org/react-transition-group

// TODO: prevent double click text selection:
// https://stackoverflow.com/a/28726111

class Story extends Component {
  state = {
    showDetails: false
  }

  render () {
    const { story } = this.props
    const { showDetails } = this.state

    return (
      <div className='story'
        onClick={() => this.setState({ showDetails: !showDetails })}
      >

        <span className='author'>
          {story.authorName}
        </span>

        <span className='date'>
          {moment(story.published_at).format('MMMM Do, YYYY')}
        </span>

        <span className='title'>
          {story.title}
        </span>

        {showDetails && (
          <div className='details'>
            {story.description}
          </div>
        )}

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
