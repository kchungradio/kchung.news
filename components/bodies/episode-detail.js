import React from 'react'
import moment from 'moment'

import PlayEpisodeButton from '../play-episode-button'

import { getDurationString } from '../../lib/utils'

// TODO: make window size adjust to each episode

const EpisodeDetail = ({ episode, playEpisode }) => {
  const {
    title,
    location,
    date,
    contributor,
    series,
    description,
    tags,
    audio,
    images
  } = episode

  return (
    <div className='episode-container'>

      <div className='episode-detail'>
        <div className='episode'>

          {audio && audio.url &&
          <div className='sidebar'>
            <PlayEpisodeButton
              episode={episode}
              playEpisode={playEpisode}
            />
          </div>
          }

          <div className='info'>
            <h3>{moment(date).format('M.D.YYYY')}</h3>
            <h1>{title}</h1>
            <div>{location || ''}</div>
            <div>{audio && audio.seconds && getDurationString(audio.seconds)}</div>
          </div>

        </div>

        <br />

        <div className='detail'>
          <div className='left'>
            {contributor && <p><u>Contributor:</u> {contributor}</p>}
            {contributor && <br />}
            {series && <p><u>Series:</u> {series}</p>}
            {series && <br />}
            {description && <p>{description}</p>}
          </div>

          <div className='tags'>
            {tags && <p><u>Tags</u></p>}
            {tags && tags.map(tag => <div key={tag} className='tag'>#{tag}</div>)}
          </div>
        </div>

        <div className='images'>
          {images && images.map((image, index) =>
            <img key={index}
              src={image.url}
              title={image.caption}
              height='130px'
            />
          )}
        </div>

      </div>

      <style jsx>{`
        .episode-container {
          padding: 5px 0 5px 40px;
          color: black;
          background: white;
        }
        .episode-detail {
          max-width: 600px;
        }
        .episode {
          display: flex;
          padding-top: 14px;
        }
        .sidebar {
          width: 90px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .icon:first-child {
          padding-bottom: 3px;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          padding: 0 5px 0 30px;
        }
        .info > div {
          font-size: 20px;
        }
        .detail {
          display: flex;
          padding: 10px 0;
        }
        .detail > .left {
          width: 78%;
          margin-right: 60px;
        }
        .tags p {
          font-size: 16px;
        }
        .tag {
          font-size: 14px;
        }
        img {
          padding: 10px 10px 0 0;
        }
      `}</style>

    </div>
  )
}

export default EpisodeDetail
