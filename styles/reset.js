import {css} from 'styled-components'
export const reset = () => {
  return css`
    html,
    body,
    body div,
    span,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    abbr,
    address,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    samp,
    small,
    strong,
    sub,
    sup,
    var,
    b,
    i,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    figure,
    footer,
    header,
    menu,
    nav,
    section,
    time,
    mark,
    audio,
    video,
    details,
    summary {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font-weight: normal;
      vertical-align: baseline;
      background: transparent;
    }

    main,
    article,
    aside,
    figure,
    footer,
    header,
    nav,
    section,
    details,
    summary {
      display: block;
    }

    html {
      box-sizing: border-box;
    }

    body {
      font-family: 'Noto Sans Thai','Questrial';
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    img,
    object,
    embed {
      max-width: 100%;
    }

    html {
      overflow-y: auto;
    }

    ul {
      list-style: none;
    }

    blockquote,
    q {
      quotes: none;
    }

    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
      content: '';
      content: none;
    }

    a {
      margin: 0;
      padding: 0;
      font-size: 100%;
      vertical-align: baseline;
      background: transparent;
    }

    del {
      text-decoration: line-through;
    }

    abbr[title],
    dfn[title] {
      border-bottom: 1px dotted #000;
      cursor: help;
    }

    table {
      border-collapse: separate;
      border-spacing: 0;
    }
    th {
      font-weight: bold;
      vertical-align: bottom;
    }
    td {
      font-weight: normal;
      vertical-align: top;
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid #ccc;
      margin: 1em 0;
      padding: 0;
    }

    input,
    select {
      vertical-align: middle;
    }

    pre {
      white-space: pre; /* CSS2 */
      white-space: pre-wrap; /* CSS 2.1 */
      white-space: pre-line; /* CSS 3 (and 2.1 as well, actually) */
      word-wrap: break-word; /* IE */
    }

    input[type='radio'] {
      vertical-align: text-bottom;
    }
    input[type='checkbox'] {
      vertical-align: bottom;
    }
    .ie7 input[type='checkbox'] {
      vertical-align: baseline;
    }
    .ie6 input {
      vertical-align: text-bottom;
    }

    select,
    input,
    textarea {
      font: 99% sans-serif;
    }

    table {
      font-size: inherit;
      font: 100%;
    }

    small {
      font-size: 85%;
    }

    strong {
      font-weight: bold;
    }

    td,
    td img {
      vertical-align: top;
    }

    sub,
    sup {
      font-size: 75%;
      line-height: 0;
      position: relative;
    }
    sup {
      top: -0.5em;
    }
    sub {
      bottom: -0.25em;
    }

    pre,
    code,
    kbd,
    samp {
      font-family: monospace, sans-serif;
    }

    .clickable,
    input[type='button'],
    input[type='submit'],
    input[type='file'],
    button {
      cursor: pointer;
    }

    button,
    input,
    select,
    textarea {
      margin: 0;
    }

    button,
    input[type='button'] {
      width: auto;
      overflow: visible;
    }

    .ie7 img {
      -ms-interpolation-mode: bicubic;
    }

    .clearfix:after {
      content: ' ';
      display: block;
      clear: both;
    }
  `
}
