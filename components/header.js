import { Link } from '../routes'

const Header = ({ session }) => (
  <div className="header">
    <h1>
      <Link route="stories">
        <a>
          <img src="/newsbody_flat_black.png" alt="KCHUNG News Body" />
        </a>
      </Link>
    </h1>

    <nav>
      <Link route="stories">
        <a>Stories</a>
      </Link>
      <span> | </span>

      {session && (
        <>
          <Link route="channel" params={{ authorSlug: session.slug }}>
            <a>{session.name}</a>
          </Link>
          <span> | </span>
        </>
      )}

      <Link route="participate">
        <a>Participate</a>
      </Link>
      <span> | </span>

      <Link route="about">
        <a>About</a>
      </Link>
      <span> | </span>

      {session ? (
        <Link route="sign-out">
          <a>Sign out</a>
        </Link>
      ) : (
        <Link route="sign-in">
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
