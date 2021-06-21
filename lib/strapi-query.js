export const findStories = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(['stories!'])
    }, 1500)
  })
}
