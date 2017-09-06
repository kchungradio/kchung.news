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
      input, textarea {
        font-family: courier, sans-serif;
        font-size: 14px;
        background-color: red;
        color: white;
        width: 100%;
        padding: 12px 20px;
        margin: 10px 0;
        border: none;
        border-bottom: 2px solid white;
        outline: none;
      }
      input::placeholder, textarea::placeholder {
        color: #ddd;
      }
      button.small {
        background-color: white;
        color: red;
        border: none;
        border-radius: 2px;
        cursor: pointer;
        outline: none;
      }
      button.small:active {
        background-color: #eee;
      }
      hr {
        width: 97%;
        height: 1px;
        border: none;
        margin: 1em 0 1em auto;
        background-color: #979797;
      }
      .error { font-size: 12px; }
      .red { color: red; }
      .darkgrey { color: darkgrey; }
      .hidden {
        display: none;
      }
    `}</style>
  </div>
)
