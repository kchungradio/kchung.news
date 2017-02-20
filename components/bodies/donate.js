import React from 'react'

export default () => (
  <div className='donate'>

    <h2>
      we accept tax-deductible financial donations via paypal <a
        target='_blank'
        href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=538MT3ZCJPQ5L'>
        here
      </a>
    </h2>

    <br />

    <p>
      kchung is a 501(c)(3) charitable organization.
      donations to kchung radio are tax deductible to
      the full extent of the law under federal id 81-2437303.
    </p>

    <style jsx>{`
      div { margin: 30px; }
      h2 { font-size: 1.8em; }
    `}</style>

  </div>
)
