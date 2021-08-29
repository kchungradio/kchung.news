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
      <table>
        <tbody>
          <tr>
            {abouts
              .sort((a, b) => a.index - b.index)
              .map((about) => (
                <td key={about.index}>
                  <p>
                    {about.about}
                  </p>
                </td>
              ))}
          </tr>
        </tbody>
      </table>
      <br />
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
        table {
          height: 90%;
          overflow: hidden;
        }

        td {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: auto;
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
