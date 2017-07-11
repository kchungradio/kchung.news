import { Component } from 'react'
import moment from 'moment'

// TODO: use react-transition group
// https://reactcommunity.org/react-transition-group

class Story extends Component {
  state = {
    showDetails: false
  }

  render () {
    const { story } = this.props
    const { showDetails } = this.state

    return (
      <div className='story' key={story.title}>

        <div className='main'
          onClick={() => {
            // TODO: prevent double click text selection:
            // https://stackoverflow.com/a/28726111
            this.setState({showDetails: !showDetails})
          }}
        >
          <span className='date'>
            {moment(story.published_at).format('MMMM Do, YYYY')}
          </span>
          <span className='title'>
            {story.title}
          </span>
        </div>

        {showDetails &&
          <div className='details'>details</div>
        }

        <style jsx>{`
          .story {
            margin-bottom: 10px;
          }
          .main {
            cursor: pointer;
          }
          .date {
            display: inline-block;
            width: 180px;
            text-align: right;
            margin-right: 30px;
            font-size: 85%;
          }
          .details {
            padding-left: 10px;
          }

          @media (max-width: 500px) {
            .story {
              margin-bottom: 15px;
            }
            .date {
              display: block;
              width: inherit;
              text-align: inherit;
              font-size: 11px;
              margin-bottom: 3px;
            }
          }
        `}</style>
      </div>

    )
  }
}

export default Story
