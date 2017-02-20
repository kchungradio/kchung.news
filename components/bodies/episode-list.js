import React from 'react'

import EpisodeItem from './episode-list-item'

export default ({ episodes, showEpisodeDetail, playEpisode }) => (
  <div className='episode-list'>

    {episodes.map((episode, i) =>
      <div
        className='episode-item'
        key={`${episode.title}-${episode.date}`}
      >
        <EpisodeItem
          episode={episode}
          onEpisodeClick={showEpisodeDetail}
          playEpisode={playEpisode}
        />
        {(i + 1 < episodes.length) && <hr />}
      </div>
    )}

    <style jsx>{`
      .episode-list {
        padding: 25px 0;
        color: black;
        background: white;
      }
    `}</style>

  </div>
)
