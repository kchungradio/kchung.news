import Head from 'next/head'

import config from '../config'

const { primary, secondary } = config.colors

export default () => (
  <div>
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta
        name='google-site-verification'
        content='bdv9GjKeXJSA42CbqHqI-n7yA-N9uOtIfyyTSxGff_Y'
      />
      <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
    </Head>

    <style jsx global>{`
      * {
        margin: 0;
      }
      body {
        font-family: courier, sans-serif;
        background: ${secondary};
        color: ${primary};
      }
      p {
        font-size: 0.875em;
      }
      a,
      a:link,
      a:visited,
      a:active {
        text-decoration: none;
        color: ${primary};
      }
      a:hover {
        background: ${primary};
        color: ${secondary};
      }
      h1 a:hover {
        background: ${secondary};
        color: ${primary};
      }
      input[type='text'],
      textarea {
        font-family: courier, sans-serif;
        font-size: 0.875em;
        background-color: ${secondary};
        color: ${primary};
        width: 100%;
        padding: 12px 20px;
        margin: 10px 0;
        border: none;
        border-bottom: 2px solid ${primary};
        outline: none;
      }
      input[type='text']::placeholder,
      textarea::placeholder {
        color: ${primary};
        opacity: 0.4;
      }
      button,
      input[type='submit'] {
        background-color: ${primary};
        color: ${secondary};
        border: none;
        border-radius: 2px;
        cursor: pointer;
        outline: none;
        width: auto;
      }
      button:active,
      input[type='submit']:active {
        opacity: 0.6;
      }
      button:disabled,
      input[type='submit']:disabled {
        opacity: 0.4;
      }
      button:disabled:hover,
      input[type='submit']:disabled:hover {
        cursor: not-allowed;
      }
      .btn-md {
        padding: 6px 12px;
      }
      .btn-lg {
        padding: 10px 16px;
        font-size: 0.75em;
      }
      hr {
        width: 97%;
        height: 1px;
        border: none;
        margin: 1em 0 1em auto;
        background-color: ${primary};
        opacity: 0.6;
      }
      .error {
        font-size: 0.75em;
      }
      .red {
        color: red;
      }
      .darkgrey {
        color: darkgrey;
      }
      .hidden {
        display: none;
      }
    `}</style>
  </div>
)
