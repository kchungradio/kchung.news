import moment from 'moment'

const renderStories = (stories) => (
  stories.map(story =>
    <div className='story' key={story.id}>

      <span className='date'>
        {moment(story.date).format('MMMM Do, YYYY')}
      </span>

      {/* TODO: use next/link here */}
      <a>{story.title}</a>

      <style jsx>{`
        .story {
          margin-bottom: 10px;
        }
        .date {
          display: inline-block;
          width: 180px;
          text-align: right;
          margin-right: 30px;
          font-size: 85%;
        }
        a {
          cursor: pointer;
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
)

export default ({ stories }) => <div> {renderStories(stories)} </div>
