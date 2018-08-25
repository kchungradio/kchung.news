import Cookie from 'js-cookie'

export default token => {
  window.localStorage.removeItem('jwt')
  Cookie.remove('jwt')
  // old style
  window.localStorage.removeItem('session')
  Cookie.remove('session')
}
