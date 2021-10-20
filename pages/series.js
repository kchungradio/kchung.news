import React, { useState, useEffect } from 'react'
import Page from '../components/hoc/page'
import { getSeriesList } from '../lib/strapi-query'

function BrowseSeriesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [series, setSeries] = useState([])
  const [openSeries, setOpenSeries] = useState({})

  const handleSeriesClick = (series) => {
    setOpenSeries((prevOpenSeries) =>
      prevOpenSeries?.id !== series.id ? series : null
    )
  }

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
      <SeriesList
        series={series}
        openSeries={openSeries}
        onSeriesClick={handleSeriesClick}
      />
    </>
  )
}

function SeriesList({ series, openSeries, onSeriesClick }) {
  return series.map((s) => (
    <Series
      key={s.id}
      series={s}
      openSeries={openSeries}
      onClick={onSeriesClick}
    />
  ))
}

function Series({ series, openSeries, onClick }) {
  return (
    <div className="series">
      <div className="series-main" onClick={() => onClick(series)}>
        <span className="name">{series.seriesName}</span>
      </div>
      {openSeries?.id === series.id && (
        <div className="series-description">{series.description}</div>
      )}
    </div>
  )
}

export default Page(BrowseSeriesPage)
