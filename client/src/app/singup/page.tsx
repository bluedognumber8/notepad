"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import styles from "./page.module.css";
import { useQuery } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import { format } from "date-fns";

const GET_NOTES = gql(`
  query noteFeed($cursor: String) {
  noteFeed(cursor: $cursor) {
    cursor
    hasNextPage
    notes {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
}
`);

function App() {
  return <>SigUp</>;
}

export default App;
