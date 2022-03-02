import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    font-family: 'Noto Sans', sans-serif;
    font-weight: 400;
  }
  div, section, button, figure, nav, menu{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  button {
    border: none;
    font-family: 'Noto Sans', sans-serif;
    background: none;
  }
  h1, h2, h3, h4, h5, p, hr {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    &:hover, &:focus {
      text-decoration: none;
    }
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
