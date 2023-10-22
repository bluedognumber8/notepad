"use client";
import React from "react";
import { GET_ME } from "@/graphql";
import { useQuery } from "@apollo/client";
import Image from "next/image";

function App() {
  const { loading, error, data, fetchMore } = useQuery(GET_ME);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <>
      <h1>Profile</h1>
      <p>{data?.me.username}</p>
      {data?.me.avatar && (
        <Image
          src={`https:${data.me.avatar}`}
          alt="avatar"
          width={50}
          height={50}
          layout="fixed"
        />
      )}
    </>
  );
}

export default App;
