import React, { useState, useEffect } from 'react'
import { getSeriesByName } from '../../lib/strapi-query'

function SeriesHeader({ seriesName }) {
  const [isLoading, setIsLoading] = useState(true)
  const [series, setSeries] = useState({})

  const findAndSetSeries = async () => {
    let newSeries = await getSeriesByName(seriesName)
    setSeries(newSeries)
    setIsLoading(false)
  }

  useEffect(() => {
    findAndSetSeries()
  }, [])

  return (
    !isLoading && (
      <>
        <div className="section-head">
          <h1>{`Series: ${seriesName}`}</h1>
          <p className="description">{series?.description}</p>
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
