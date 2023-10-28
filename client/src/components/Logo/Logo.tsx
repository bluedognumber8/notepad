"use client";
import React from "react";
import Link from "next/link";
import styled from "styled-components";
function Logo() {
  return <StyledLink href="/">Notepad</StyledLink>;
}

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 3rem;
`;
export default Logo;
