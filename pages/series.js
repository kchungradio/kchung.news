import React, { useState, useEffect } from 'react'
import Page from '../../components/hoc/page'
import { getSeriesList } from '../../lib/strapi-query'

function BrowseSeriesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [series, setSeries] = useState([])

  const findAndSetSeries = async () => {
    let response = await getSeriesList()
    setSeries(response)
    setIsLoading(false)
  }

  useEffect(() => {
    findAndSetSeries()
  }, [])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h1>{`Browse Series`}</h1>
      <br />
      <SeriesList series={series} />
    </>
  )
}

function SeriesList({ series }) {
  return series.map((s) => <Series key={s.id} series={s} />)
}

function Series({ series }) {
  return (
    <div className="series">
      <span className="seriesName">{series.seriesName}</span>
      {/* Series Details */}
    </div>
  )
}

export default Page(BrowseSeriesPage)
