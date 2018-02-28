const prod = process.env.NODE_ENV === 'production'

let config = {}

config.api = {}
config.s3 = {}
config.voscast = {}

config.api.storiesUrl = prod
  ? 'https://kchung-newsbody-stories-api.now.sh'
  : 'http://localhost:3001'
config.api.authUrl = prod
  ? 'https://kchung-newsbody-auth-api.now.sh'
  : 'http://localhost:3002'
config.s3.rootUrl = 'http://archive.kchung.news/'
config.voscast.url = 'http://s2.voscast.com:9208/;&type=mp3'

export default config
