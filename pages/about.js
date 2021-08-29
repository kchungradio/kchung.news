import Page from '../components/hoc/page'
import { getAbouts } from '../lib/strapi-query'
import React, { useState, useEffect } from 'react'

function AboutPage() {
  const [abouts, setAbouts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const findAndSetAbouts = async () => {
    let response = await getAbouts()
    setAbouts(response)
    setIsLoading(false)
  }

  useEffect(() => {
    findAndSetAbouts()
  }, [])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="about">
        {abouts
          .sort((a, b) => a.index - b.index)
          .map((about) => (
            <div className="scroll-cell" key={about.index}>
              {about.about}
            </div>
          ))}
      </div>
        <small>
          <p>
            <i>News Body</i> is a project of KCHUNG Radio, a Creative Capital
            recipient
          </p>
          <p>
            <a href="mailto:lyra@kchungradio.org">lyra@kchungradio.org</a>
          </p>
        </small>
      <style jsx>{`
        .about {
          display: flex;
          flex-direction: row;
          position: fixed;
        }

        .scroll-cell {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: scroll;
          position: relative;
          flex: 1;
        }

        small {
          bottom: 0px;
          position: sticky;
        }
      `}</style>
    </>
  )
}

export default Page(AboutPage)
