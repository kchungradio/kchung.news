import { Component } from 'react'
import request from 'axios'

import config from '../config'
import SecurePage from '../components/hoc/secure-page'
import StoryForm from '../components/story-form'

// TODO: make more container components

class EditStory extends Component {
  static async getInitialProps ({ query }) {
    // query.storySlug comes from url defined in ../routes.js
    const storyUrl = `${config.api.storiesUrl}/${query.storySlug}`
    const res = await request.get(storyUrl)

    return { storyToEdit: res.data }
  }

  render () {
    const { session, storyToEdit } = this.props

    return (
      <StoryForm
        session={session}
        storyToEdit={storyToEdit}
      />
    )
  }
}

export default SecurePage(EditStory)
