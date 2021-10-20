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

export default Page(BrowseSeriesPage)
