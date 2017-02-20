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

    div::-webkit-scrollbar {
      width: 19px;
      background: #d8d8d8;
      border-left: 1px solid darkgrey;
    }
    div::-webkit-scrollbar-button {
      height: 19px;
      border-left: 1px solid darkgrey;
    }
    div::-webkit-scrollbar-button:start:decrement,
    div::-webkit-scrollbar-button:end:increment {
      display: block;
    }
    div::-webkit-scrollbar-button:start:decrement {
      background-size: cover;
      background-image: url(http://www.fileformat.info/info/unicode/char/25b2/black_uppointing_triangle.png);
      border-bottom: 1px solid darkgrey;
      box-shadow: inset 1px 2px white, inset -1px 0 white;
    }
    div::-webkit-scrollbar-button:end:increment {
      background-size: cover;
      background-image: url(http://www.fileformat.info/info/unicode/char/25bc/black_downpointing_triangle.png);
      border-top: 1px solid darkgrey;
      box-shadow: inset 1px -2px white, inset -1px 0 white;
    }
    div::-webkit-scrollbar-thumb {
      background: red;
      border: 1px solid darkgrey;
      border-right: none;
      box-shadow: inset 1px 2px pink, inset -1px 0 pink;
    }
    div {
      -ms-scrollbar-base-color: #d8d8d8;
      -ms-scrollbar-face-color: red;
      -ms-scrollbar-arrow-color: black;
      -ms-scrollbar-track-color: #d8d8d8;
      -ms-scrollbar-highlight-color: white;
      -ms-scrollbar-shadow-color: white;
      -ms-scrollbar-3dlight-color: darkgrey;
      -ms-scrollbar-dark-shadow-color: darkgrey;
    }
  `}</style>
)

// https://trac.webkit.org/export/41842/trunk/LayoutTests/scrollbars/overflow-scrollbar-combinations.html
//
// http://codemug.com/html/custom-scrollbars-using-css
// https://msdn.microsoft.com/en-us/library/ms531156.aspx
