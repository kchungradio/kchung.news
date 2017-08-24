import { Link } from '../routes'

export default ({ session }) => (
  <div className='header'>
    <h1>
      <Link route='stories'>
        <a>
          KCHUNG News Body
        </a>
      </Link>
    </h1>

    <nav>
      <Link route='stories'><a>Stories</a></Link>
      <span> | </span>

      {session
        ? (
          <Link
            route='authorStories'
            params={{ authorSlug: session.slug }}
          >
            <a>{session.name}</a>
          </Link>
        )
        : <Link route='participate'><a>Participate</a></Link>}
      <span> | </span>

      {session
        ? <Link route='sign-out'><a>Sign out</a></Link>
        : <Link route='sign-in'><a>Sign in</a></Link>}
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
