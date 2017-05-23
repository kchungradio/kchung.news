const prod = process.env.NODE_ENV === 'production'

let config = {}

config.db = {}
config.ghost = {}
config.s3 = {}
config.voscast = {}

config.db.api_url = prod
  ? 'https://kchung-newsbody-db-api.now.sh'
  : 'http://localhost:3001'
config.ghost.api_url = 'https://ghost.kchung.news/ghost/api/v0.1/'
config.ghost.client_secret = '34ca5ae3e5ca'
config.s3.root_url = 'http://archive.kchung.news/'
config.voscast.url = 'http://s2.voscast.com:9208/;&type=mp3'

export default config
