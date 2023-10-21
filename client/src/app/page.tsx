"use client";
import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import styled from "styled-components";
import { useApolloClient, gql } from "@apollo/client";

function App() {

  return (
    <>
      <h1>Hello, Home page!</h1>
    </>
  );
}

export default App;
