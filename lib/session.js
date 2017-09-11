import Cookie from 'js-cookie'

const isProduction = process.env.NODE_ENV === 'production'

export default session => {
  const sessionStr = JSON.stringify(session)
  const encodedSessionStr = window.btoa(sessionStr)

  // store the session for the benefit of client and server
  window.localStorage.setItem('session', sessionStr)
  Cookie.set('session', encodedSessionStr, { secure: isProduction })
}
