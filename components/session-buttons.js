import React from 'react'

import { Router } from '../routes'

export default () => (
  <React.Fragment>
    <button onClick={() => Router.pushRoute('new-story')}>
      New Story
    </button>
    <button onClick={() => Router.pushRoute('edit-profile')}>
      Edit Profile
    </button>

    <style jsx>{`
      button {
        margin: 0 10px 10px 0;
      }
    `}</style>
  </React.Fragment>
)
