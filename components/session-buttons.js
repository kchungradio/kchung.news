import React from 'react'

import { Router } from '../routes'

const SessionButtons = () => (
  <React.Fragment>
    <button onClick={() => Router.pushRoute('new-story')}>New Story</button>
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

export default SessionButtons
