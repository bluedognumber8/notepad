"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query Query {
    notes {
      content
    }
  }
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.notes.map(({ content, index }) => (
    <>
      <p key={index}>{content}</p>
      <br />
    </>
  ));
}

function App() {
  return (
    <>
      <h1>Notes</h1>
      <DisplayLocations />
    </>
  );
}

export default App;
