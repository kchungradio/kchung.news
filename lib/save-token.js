import Cookie from 'js-cookie'

const isProduction = process.env.NODE_ENV === 'production'

export default token => {
  // store jwt for the benefit of client and server
  window.localStorage.setItem('jwt', token)
  Cookie.set('jwt', token, { secure: isProduction })
}
