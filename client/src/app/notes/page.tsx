"use client";
import React from "react";
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
  const { loading, error, data, fetchMore } = useQuery(GET_NOTES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <h1>Notes</h1>
      {data?.noteFeed?.notes.map((note) => {
        return (
          <React.Fragment key={note?.id}>
            <Author>{note?.author.username}</Author>
            <p className={styles.content}>{note?.content}</p>
            <p className={styles.date}>
              {format(new Date(note?.createdAt), "yyyy-MM-dd")}
            </p>
            <Link href={`/notes/${note?.id}`}>{note?.id}</Link>

            <br />
          </React.Fragment>
        );
      })}
      {data?.noteFeed?.hasNextPage && (
        <button
          onClick={() => {
            fetchMore({
              variables: { cursor: data.noteFeed?.cursor || "" },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return previousResult;
                return {
                  noteFeed: {
                    __typename: "NoteFeed",
                    cursor: fetchMoreResult.noteFeed?.cursor || "",
                    hasNextPage: fetchMoreResult.noteFeed?.hasNextPage || false,
                    notes: [
                      ...(previousResult?.noteFeed?.notes || []),
                      ...(fetchMoreResult?.noteFeed?.notes || []),
                    ],
                  },
                };
              },
            });
          }}
        >
          Add 2020 Inventory
        </button>
      )}
    </>
  );
}

const Author = styled.p`
  font-size: 1.1em;
  font-weight: 800;
`;

export default App;
