import moment from 'moment'

export default seconds => {
  const duration = moment.duration(seconds, 's')
  const ms = moment.utc(duration.asMilliseconds())
  const hours = Math.floor(duration.asHours())

  return hours ? hours + ms.format(':mm:ss') : ms.format('m:ss')
}
