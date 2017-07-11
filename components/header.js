import Link from 'next/link'

export default () => (
  <div className='kchung'>
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
      <Link href='/upload'><a>upload</a></Link>
      <span> | </span>
      <Link href='/participate'><a>participate</a></Link>
    </nav>

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
