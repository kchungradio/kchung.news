import { Component } from 'react'
import { format, parseISO } from 'date-fns'
// import Router from 'next/router'

// import Images from './images'

// TODO: use react-transition group
// https://reactcommunity.org/react-transition-group

// TODO: prevent double click text selection:
// https://stackoverflow.com/a/28726111

class Story extends Component {
  render() {
    const { story, onClick } = this.props
    return (
      <div className="story">
        <div className="story-main" onClick={() => onClick(story)}>
          <span className="author">{story.author}</span>

          <span className="date">
            {story.date ? format(parseISO(story.date), 'MMMM do, yyyy') : '---'}
          </span>

          <span className="title">{story.title}</span>
        </div>

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
