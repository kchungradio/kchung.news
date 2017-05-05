import React from 'react'

// TODO: test in IE

export default () => (
  <style jsx global>{`
    * {
      margin: 0;
    }
    body {
      font-family: courier, sans-serif;
      font-size: 13px;
      background: red;
      color: white;
    }
    a, a:link, a:visited, a:active {
      text-decoration: none;
    }
    a:hover {
      background: white;
      color: red;
    }
    h1 {
      font-size: 35px;
      margin: 0.08em 0;
    }
    h2, h3 {
      margin: 0.14em 0;
      font-weight: normal;
    }
    h2 {
    }
    h3 {
      font-size: 1.7em;
    }
    p {
      font-size: 14px;
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
  `}</style>
)
