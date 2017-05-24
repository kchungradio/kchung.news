import { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'

import { getStoryBySlug } from '../lib/db'

import MainLayout from '../layouts/main'
import Header from '../components/header'

export default class Story extends Component {
  static async getInitialProps ({ query: { slug } }) {
    const story = await getStoryBySlug(slug)
    return { story }
  }

  render () {
    const { title, html } = this.props.story

    return (
      <div>
        <MainLayout>
          <Header />
          <h1>{title}</h1>
          <article>
            {ReactHtmlParser(html)}
          </article>
        </MainLayout>
      </div>
    )
  }
}
