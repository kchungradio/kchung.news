import Page from '../components/hoc/page'
import { getAbouts } from '../lib/strapi-query'
import React, {useState, useEffect} from 'react'

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
        {abouts.sort((a,b) => a.index - b.index).map((about) => 
          <td key={about.index}>{about.about}</td>
        )}
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
    </>
  )
}

export default Page(AboutPage)
