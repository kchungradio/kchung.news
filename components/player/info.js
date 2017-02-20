import React from 'react'
import moment from 'moment'

const Info = ({ episode }) => {
  const { title, location, date, tags } = episode

  return (
    <div className='info-container'>

      <div className='info'>

        <div className='top'>
          <div className='date'>
            {date && moment(date).format('M.D.YYYY')}
          </div>
          <div className='location'>
            {location && location.toUpperCase()}
          </div>
        </div>

        <div className='title'>
          <h2>{title}</h2>
        </div>

        <div className='tags'>
          {tags && tags.map(tag =>
            <div key={tag} className='tag'>#{tag} </div>
          )}
        </div>

      </div>

      <style jsx>{`
        .info-container {
          height: 100%;
        }
        .info {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-content: center;
          padding-right: 15px;
        }
        .top {
          display: flex;
          justify-content: space-between;
        }
        .title {
          overflow: hidden;
        }
        .tag {
          display: inline;
        }
      `}</style>

    </div>
  )
}

Info.propTypes = {
  episode: React.PropTypes.object
}

export default Info
