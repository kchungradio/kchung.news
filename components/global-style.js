import React from 'react'

// TODO: test in IE

export default () => (
  <style jsx global>{`
    * {
      margin: 0;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    body {
      font-family: courier, sans-serif;
      background: red;
      color: white;
      position: fixed;
    }
    a, a:link, a:visited, a:active {
      text-decoration: none;
    }
    a:hover {
      background: white;
      color: red;
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
