import { Component } from 'react'

import Global from '../components/global'
import Header from '../components/header'

const wrapWithLayout = Page => (
  class WrapWithLayout extends Component {
    static getInitialProps (ctx) {
      return Page.getInitialProps
        ? Page.getInitialProps(ctx)
        : {}
    }

    render () {
      return (
        <div className='background'>
          <Global />

          <div className='layout'>
            <Header session={this.props.session} />
            <Page {...this.props} />
          </div>

          <style jsx>{`
            .layout {
              padding: 20px 40px;
            }
          `}</style>
        </div>
      )
    }
  }
)

export default wrapWithLayout
