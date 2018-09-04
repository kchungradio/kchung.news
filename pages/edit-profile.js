import React from 'react'
import { Mutation } from 'react-apollo'

import { Router } from '../routes'

import { updateAuthorName } from '../graphql/mutations'

import ProfileForm from '../components/forms/profile-form'
import SecurePage from '../components/hoc/secure-page'

function EditProfilePage ({ session }) {
  return (
    <Mutation mutation={updateAuthorName}>
      {(updateAuthorName, { loading, error }) => (
        <React.Fragment>
          <ProfileForm
            name={session.name}
            onSubmit={name => {
              updateAuthorName({ variables: { id: session.id, name } })
                .then(res => {
                  console.log('res', JSON.stringify(res))
                  // we sign out so we can get a jwt with the new name
                  Router.pushRoute('sign-out')
                })
                .catch(handleError)
            }}
            onCancel={() => Router.pushRoute('stories')}
            loading={loading}
          />
          {error && <div>There was an error.</div>}
        </React.Fragment>
      )}
    </Mutation>
  )
}

function handleError (err) {
  console.error('error', JSON.stringify(err))
}

export default SecurePage(EditProfilePage)
