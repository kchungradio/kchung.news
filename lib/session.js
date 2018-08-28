import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'

const isProduction = process.env.NODE_ENV === 'production'

export default session => {
  const sessionStr = JSON.stringify(session)
  const encodedSessionStr = window.btoa(sessionStr)

  // store the session for the benefit of client and server
  window.localStorage.setItem('session', sessionStr)
  Cookie.set('session', encodedSessionStr, { secure: isProduction })
}

export const getSession = (req) =>
  process.browser
    ? getSessionFromLocalStorage()
    : getSessionFromCookie(req)

const getSessionFromLocalStorage = () => {
  const token = window.localStorage.getItem('jwt')
  const session = jwt.decode(token)

  if (session) {
    session.token = token
    return session
  }
}

const getSessionFromCookie = (req) => {
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
