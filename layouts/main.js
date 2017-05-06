import Global from '../components/global'

export default ({ children }) => (
  <div className='background'>
    <Global />

    <div className='main'>
      {children}
    </div>

    <style jsx>{`
      .main {
        padding: 30px 40px;
      }
    `}</style>
  </div>
)
