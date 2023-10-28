"use client";
import React from "react";
import Logo from "../../components/Logo";
import Menu from "../../components/Menu";
import { styled } from "styled-components";

function Header() {
  return (
    <Wrapper>
      <Side>
        <Logo />
      </Side>
      <Menu />
      <Side />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  align-items: baseline;
  padding: 30px 30px;
  height: 140px;
  background-color: rgb(228, 236, 154);
`;
const Side = styled.div`
  width: 200px;
`;

export default Header;
