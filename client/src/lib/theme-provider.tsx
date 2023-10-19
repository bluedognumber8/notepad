"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

interface Props {
  children?: ReactNode;
}

const theme = {
  main: "mediumseagreen",
};

export default function _ThemeProvider({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
