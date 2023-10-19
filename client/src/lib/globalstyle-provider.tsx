"use client";
import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean }>`

    /*
    Josh's Custom CSS Reset
    https://www.joshwcomeau.com/css/custom-css-reset/
  */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    color: ${(props) => (props.$whiteColor ? "white" : "black")};
    font-family: ${(props) => props.theme.fontFamily};
  }
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }
  #root,
  #__next {
    isolation: isolate;
  }
`;

export default function _GlobalStyle() {
  return <GlobalStyle $whiteColor={false} />;
}
