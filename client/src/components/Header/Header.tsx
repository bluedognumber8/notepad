"use client";
import React from "react";
import Logo from "../../components/Logo";
import Menu from "../../components/Menu";
import { styled } from "styled-components";

function Header() {
  return (
    <Wrapper>
      <Logo />
      <Menu />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  height: 140px;
  background-color: rgb(228, 236, 154);
  padding-left: 20px;
  padding-right: 20px;
  min-width: fit-content;
`;

export default Header;
