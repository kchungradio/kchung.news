export default (...fns) => (...args) => {
  fns.reverse().forEach(fn => {
    if (!Array.isArray(args)) {
      args = [args]
    }
    args = fn.apply(null, args)
  })
  return args
}
