import Link from 'next/link'

export default ({ session }) => (
  <div className='header'>
    <h1>
      <Link href='/'>
        <a>
          KCHUNG News Body
        </a>
      </Link>
    </h1>

    <nav>
      <Link href='/'><a>stories</a></Link>
      <span> | </span>

      {session
        ? <Link href='/:username'><a>{session.name}</a></Link>
        : <Link href='/participate'><a>participate</a></Link>}
      <span> | </span>

      {session
        ? <Link href='/sign-out'><a>sign out</a></Link>
        : <Link href='/sign-in'><a>sign in</a></Link>}
    </nav>

    <br />

    <style jsx> {`
      h1 {
        text-transform: lowercase;
        letter-spacing: 0.25rem;
        font-size: 8.423vw;
      }
      nav {
        padding-top: 5px;
      }
      @media (max-width: 500px) {
        h1 {
          font-size: 6.4vw;
        }
      }
    `}</style>
  </div>
)
