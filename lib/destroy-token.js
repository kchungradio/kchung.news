import Cookie from 'js-cookie'

export default () => {
  window.localStorage.removeItem('jwt')
  Cookie.remove('jwt')
  // old style
  window.localStorage.removeItem('session')
  Cookie.remove('session')
}
