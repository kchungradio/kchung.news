const prod = process.env.NODE_ENV === 'production'
// const prod = true

let config = {}

config.colors = {
  primary: 'black',
  secondary: 'rgb(239, 123, 126)',
  disabled: 'grey',
}

config.api = {}
config.api.s3UrlSigning = prod
  ? 'https://s3-url-signing.kchung.news'
  : 'http://localhost:3001'
config.api.graphql = prod
  ? 'https://graphql.kchung.news'
  : 'http://localhost:4000'
config.api.auth = prod ? 'https://auth.kchung.news' : 'http://localhost:3002'
config.api.baseUrl = 'https://api.kchung.news'
config.api.endpoints = {
  stories: '/stories',
  series: '/series',
  countStories: '/stories/count',
  countSeries: '/series/count',
}
config.api.queries = {
  author: '?author=',
  series: '?series.seriesName=',
  tag: '?tags.tagName_in=',
}
config.defaultPageTitle = 'KCHUNG News Body'
config.pageDescriptions = {
  default:
    'KCHUNG News Body is a vehicle for mobile, roving broadcast that brings live interviews and reporting as well as production training to any site, event and community.',
  participate:
    'Become a kchung news contributor here. go out and record sounds in your world using any available means',
}

config.s3 = {}
config.s3.rootUrl = 'https://s3-us-west-2.amazonaws.com/archive.kchung.news/'

config.voscast = {}
config.voscast.url = 'http://s2.voscast.com:9208/;&type=mp3'

export default config
