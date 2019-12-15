import React from 'react'
import Router from 'next/router'

// TODO change button to Link > a

const SessionButtons = () => (
  <React.Fragment>
    <button onClick={() => Router.push('/new')}>New Story</button>
    <button onClick={() => Router.push('/edit-profile')}>Edit Profile</button>

    <style jsx>{`
      button {
        margin: 0 10px 10px 0;
      }
    `}</style>
  </React.Fragment>
)

export default SessionButtons
