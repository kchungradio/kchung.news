import { Fragment, useEffect } from 'react'

import Page from '../components/hoc/page'
import config from '../config'

function ParticipatePage({ setPageTitle, setPageDescription }) {
  useEffect(() => {
    setPageTitle('Participate')
    setPageDescription(config.pageDescriptions.participate)
  }, [])
  return (
    <Fragment>
      <p>become a kchung news contributor</p>
      <br />
      <ol>
        <li>
          go out and record sounds in your world using any available means
          (phone is fine)
        </li>
        <li>edit.... or not!</li>
        <li>
          get in touch! email us at{' '}
          <a
            href="mailto:lyra@kchungradio.org?Subject=Participate"
            tabIndex={0}
          >
            <b>lyra@kchungradio.org</b>
          </a>{' '}
          and we will get you set up
        </li>
        <li>
          you can contribute just once, or as many times as you like forever and
          ever
        </li>
      </ol>
      <br />
      <p>
        if you have any questions or would like more info,{' '}
        <a href="mailto:lyra@kchungradio.org?Subject=Participate" tabIndex={0}>
          <b>let us know</b>
        </a>
      </p>
    </Fragment>
  )
}

export default Page(ParticipatePage)
