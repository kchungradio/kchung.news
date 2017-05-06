import moment from 'moment'

const renderStories = () => (
  recentStories.map(story =>
    <div className='story'>

      <span className='date'>
        {moment(story.date).format('MMMM Do, YYYY')}
      </span>

      <a>{story.title}</a>

      <style jsx>{`
        .post {
          margin-bottom: 10px;
        }

        .date {
          display: inline-block;
          width: 180px;
          text-align: right;
          margin-right: 30px;
        }

        a {
          text-decoration: underline;
          cursor: pointer;
        }

        @media (max-width: 500px) {
          .post {
            margin-bottom: 15px;
          }

          .date {
            display: block;
            width: inherit;
            text-align: inherit;
            font-size: 11px;
            margin-bottom: 5px;
          }
        }
      `}</style>
    </div>
  )
)

const recentStories = [
  {
    id: '1',
    title: 'antifa clash w/ fascists',
    date: '2017-05-01'
  }, {
    id: '2',
    title: 'trump destroys america',
    date: '2017-04-29'
  }, {
    id: '3',
    title: 'ai singularists promote body modification',
    date: '2017-04-20'
  }, {
    id: '4',
    title: 'neighborhood council solicits neighbors help',
    date: '2017-04-19'
  }
]

export default () => <div> {renderStories()} </div>
