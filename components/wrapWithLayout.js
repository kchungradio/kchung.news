import React from 'react'

import Global from '../components/global'
import Header from '../components/header'

const wrapWithLayout = Page => (
  class WrapWithLayout extends React.Component {
    static getInitialProps (context) {
      return Page.getInitialProps
        ? Page.getInitialProps(context)
        : {}
    }

    render () {
      return (
        <div className='background'>
          <Global />

          <div className='main'>
            <Header />
            <Page {...this.props} />
          </div>

          <style jsx>{`
            .main {
              padding: 30px 40px;
            }
          `}</style>
        </div>
      )
    }
  }
)

export default wrapWithLayout
