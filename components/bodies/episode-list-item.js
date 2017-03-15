import React from 'react'
import moment from 'moment'

import PlayEpisodeButton from '../play-episode-button'

export default ({ episode, onEpisodeClick, playEpisode }) => {
  const {
    location,
    date,
    title,
    tags = [],
    audio
  } = episode

  return (
    <div className='episode' onClick={event => onEpisodeClick(event, episode)}>

      {audio &&
      <div className='sidebar'>
        <PlayEpisodeButton
          episode={episode}
          playEpisode={playEpisode}
        />
      </div>
      }

      <div className='info'>

        <div className='top'>
          <div>{location && location.toUpperCase()}</div>
          <div>{date && moment(date).fromNow()}</div>
        </div>

        <h2>{title}</h2>

        <div className='tags'>
          {tags.map((tag, i) =>
            <span key={i} className='tag'>#{tag} </span>
          )}
        </div>

      </div>

      <style jsx>{`
        .episode {
          display: flex;
          padding: 4px 26px;
          cursor: pointer;
        }
        .sidebar {
          width: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          padding: 0 5px 0 30px;
        }
        .top {
          display: flex;
          justify-content: space-between;
        }
        .center-text {
          text-align: center;
        }
        .icon:first-child {
          padding-bottom: 3px;
        }
      `}</style>

    </div>
  )
}
