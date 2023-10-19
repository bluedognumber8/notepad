"use client";

import React from "react";
import { gql } from "@/__generated__/gql";
import { useQuery } from "@apollo/client";
import styles from "./page.module.css";
import { format } from "date-fns";

const GET_NOTE = gql(`
  query Query($noteId: ID!) {
  note(id: $noteId) {
    author {
      avatar
      email
      username
    }
    content
    createdAt
    favoriteCount
    updatedAt
  }
}
`);
function Page({ params }: { params: { id: string } }) {
  const { loading, error, data } = useQuery(GET_NOTE, {
    variables: { noteId: params.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <>
      <p className={styles.author}>{data?.note?.author.username}</p>
      <p className={styles.content}>{data?.note?.content}</p>
      <p className={styles.date}>
        {format(new Date(data?.note?.createdAt), "yyyy-MM-dd")}
      </p>

      <br />
    </>
  );
}

export default Page;
