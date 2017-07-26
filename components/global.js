import Head from 'next/head'

export default () => (
  <div>
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='google-site-verification' content='bdv9GjKeXJSA42CbqHqI-n7yA-N9uOtIfyyTSxGff_Y' />
      <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
    </Head>

    <style jsx global>{`
      * {
        margin: 0;
      }
      body {
        font-family: courier, sans-serif;
        background: red;
        color: white;
      }
      a, a:link, a:visited, a:active {
        text-decoration: none;
        color: white;
      }
      a:hover {
        background: white;
        color: red;
      }
      h1 a:hover {
        background: red;
        color: white;
      }
      hr {
        width: 97%;
        height: 1px;
        border: none;
        margin: 1em 0 1em auto;
        background-color: #979797;
      }
      .red { color: red; }
      .darkgrey { color: darkgrey; }
      .hidden {
        display: none;
      }
    `}</style>
  </div>
)
