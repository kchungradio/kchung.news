import Link from 'next/link'

const Header = ({ session }) => (
  <div className="header">
    <h1>
      <Link href="/">
        <a>
          <img src="/newsbody_flat_black.png" alt="KCHUNG News Body" />
        </a>
      </Link>
    </h1>

    <nav>
      <Link href="/">
        <a>Stories</a>
      </Link>
      <span> | </span>

      {session && (
        <>
          <Link href="/channel/[author]" as={`/channel/${session.slug}`}>
            <a>{session.name}</a>
          </Link>
          <span> | </span>
        </>
      )}

      <Link href="/participate">
        <a>Participate</a>
      </Link>
      <span> | </span>

      <Link href="/about">
        <a>About</a>
      </Link>
      <span> | </span>

      {session ? (
        <Link href="/auth/sign-out">
          <a>Sign out</a>
        </Link>
      ) : (
        <Link href="/auth/sign-in">
          <a>Sign in</a>
        </Link>
      )}
    </nav>

    <br />

    <style jsx>{`
      img {
        width: 100%;
      }
      nav {
        padding-top: 5px;
      }
    `}</style>
  </div>
)

export default Header
