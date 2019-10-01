import jwt from 'jsonwebtoken'

export const getSession = req =>
  process.browser ? getSessionFromLocalStorage() : getSessionFromCookie(req)

function getSessionFromLocalStorage() {
  const token = window.localStorage.getItem('jwt')
  const session = jwt.decode(token)

  if (session) {
    session.token = token
    return session
  }
}

function getSessionFromCookie(req) {
  // this only runs on the server
  const { cookie } = req.headers

  if (cookie) {
    const jwtCookie = cookie
      .split(';')
      .map(s => s.trim())
      .find(s => s.startsWith('jwt='))

    if (jwtCookie) {
      // split on first equals sign
      const token = jwtCookie.split(/=(.+)/)[1]
      const session = jwt.decode(token)

      if (session) {
        session.token = token
        return session
      }
    }
  }
}
