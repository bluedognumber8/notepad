"use client";
import * as React from "react";
import styled from "styled-components";

function Footer() {
  return <Wrapper>Page rendered on {new Date().toLocaleString()}</Wrapper>;
}

const Wrapper = styled.div`
  margin-top: auto;
  margin-bottom: 50px;
  text-align: center;
`;
export default Footer;
