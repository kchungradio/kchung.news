import slugify from 'slugify'

export default str => {
  return slugify(str, {
    lower: true,
    remove: /['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g
  })
}
