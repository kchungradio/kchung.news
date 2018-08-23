import Cookie from 'js-cookie'

export default token => {
  window.localStorage.removeItem('jwt')
  Cookie.remove('jwt')
}
