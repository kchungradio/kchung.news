const prod = process.env.NODE_ENV === 'production'

let config = {}

config.db = {}
config.s3 = {}
config.voscast = {}

config.db.api_url = prod
  ? 'https://kchung-newsbody-db-api.now.sh'
  : 'http://localhost:3001'
config.s3.root_url = 'http://archive.kchung.news/'
config.voscast.url= 'http://s2.voscast.com:9208/;&type=mp3'

export default config
