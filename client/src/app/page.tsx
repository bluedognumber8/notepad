"use client";
import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import styled from "styled-components";
function App() {
  return (
    <>
      <main>
        <h1>Hello, Home page!</h1>
      </main>
    </>
  );
}

const A = styled.div`
  background-color: red;
`;

export default App;
