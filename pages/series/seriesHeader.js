import React, { useState, useEffect } from 'react'
import { getSeriesByName } from '../../lib/strapi-query'

// Num characters to truncate description to if it is 'collapsed'
const MAX_DESCRIPTION_SIZE = 240
const SHOW_MORE = 'Show More'
const ELLIPSES = ' ... '

function SeriesHeader({ seriesName }) {
  const [isLoading, setIsLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(true)
  const [series, setSeries] = useState({})

  const findAndSetSeries = async () => {
    let newSeries = await getSeriesByName(seriesName)
    setSeries(newSeries)
    setIsLoading(false)
  }

  const truncateDescription = (description) => {
    if (description && description.length > MAX_DESCRIPTION_SIZE && collapsed) {
      return description.slice(0, MAX_DESCRIPTION_SIZE)
    }
    return description
  }

  useEffect(() => {
    findAndSetSeries()
  }, [])

  return (
    !isLoading && (
      <>
        <div className="section-head">
          <h1>{`Series: ${seriesName}`}</h1>
          <p className="description">
            {truncateDescription(series?.description)}
            {series?.description.length > MAX_DESCRIPTION_SIZE && collapsed && (
              <>
                <span>{ELLIPSES}</span>
                <button onClick={() => setCollapsed(false)} tabIndex={0}>
                  {SHOW_MORE}
                </button>
              </>
            )}
          </p>
        </div>
        <style jsx>{`
          .section-head {
            margin: 0 0 30px 0;
            border: solid 1px black;
            padding: 10px 0 10px 0;
          }
        `}</style>
      </>
    )
  )
}

export default SeriesHeader
