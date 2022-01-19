import { useEffect } from 'react'
import Page from '../components/hoc/page'
import config from '../config'

function AboutPage({ setPageTitle, setPageDescription }) {
  useEffect(() => {
    setPageTitle('About')
    setPageDescription(`About: ${config.pageDescriptions.default}`)
  }, [])
  return (
    <>
      <p>
        <i>News Body</i> is a vehicle for mobile, roving broadcast that brings
        live interviews and reporting as well as production training to any
        site, event and community. Operated by KCHUNG collective members,
      </p>
      <p>
        <i>News Body</i> creates a moveable signal, a hyper-local live radio
        transmission for listeners.
      </p>
      <p>
        <i>News Body</i> makes KCHUNG’s site-specific programming accessible to
        a worldwide audience through online audio streaming, on-location and in
        real time.
      </p>
      <p>
        <i>News Body</i> produces in-depth news programs and building a
        searchable online archive of past programming.
      </p>
      <p>
        <i>News Body</i> creates opportunities for spectacle, performance and
        live engagement that imagine new uses and definitions for news in our
        communities.
      </p>
      <br />
      <small>
        <p>
          <i>News Body</i> is a project of KCHUNG Radio, a Creative Capital
          recipient
        </p>
        <p>
          <a href="mailto:lyra@kchungradio.org" tabIndex={0}>
            lyra@kchungradio.org
          </a>
        </p>
      </small>
    </>
  )
}

export default Page(AboutPage)
