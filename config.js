const prod = process.env.NODE_ENV === 'production'

let config = {}

config.colors = {
  primary: 'black',
  secondary: 'rgb(239, 123, 126)',
  disabled: 'grey'
}

config.api = {}
config.api.s3UrlSigning = prod
  ? 'https://s3-url-signing.api.kchung.news'
  : 'http://localhost:3001'
config.api.graphql = prod
  ? 'https://graphql.api.kchung.news'
  : 'http://localhost:4000'
config.api.auth = prod
  ? 'https://dev-auth.api.kchung.news'
  : 'http://localhost:3002'

config.s3 = {}
// config.s3.rootUrl = 'http://archive.kchung.news/'
config.s3.rootUrl = 'https://s3-us-west-2.amazonaws.com/archive.kchung.news/'

config.voscast = {}
config.voscast.url = 'http://s2.voscast.com:9208/;&type=mp3'

export default config
