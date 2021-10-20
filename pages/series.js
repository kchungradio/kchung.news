import React, { useState, useEffect } from 'react'
import Page from '../components/hoc/page'
import Router from 'next/router'
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
        <>
          <button
            onClick={() => {
              Router.push('/series/[series]', `/series/${series.seriesName}`)
              onClick({ id: '' })
            }}
          >
            View Series
          </button>
          <div className="description">{series.description}</div>
        </>
      )}
      <style jsx>{`
        .description {
          font-size: 0.875em;
          margin-top: 5px;
        }
        .series {
          margin-bottom: 10px;
        }
        .series-main {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default Page(BrowseSeriesPage)
