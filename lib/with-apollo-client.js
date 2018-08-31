// https://github.com/zeit/next.js/blob/b9533c318d25225a9a66a766d83efde8ac2a176d/examples/with-apollo/lib/with-apollo-client.js

import { Component } from 'react'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'

import initApollo from './init-apollo'
import { getSession } from './session'

export default (App) => {
  return class Apollo extends Component {
    static displayName = 'withApollo(App)'

    static async getInitialProps (ctx) {
      const { Component, router, ctx: { req } } = ctx

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo({}, {
        getToken: () => {
          const session = getSession(req)
          return session && session.token
        }
      })
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore needs to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState
      }
    }

    constructor (props) {
      super(props)
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => {
          const session = getSession()
          return session && session.token
        }
      })
    }

    render () {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}
