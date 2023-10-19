"use client";
import React, { ReactNode } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

interface Props {
  children?: ReactNode;
}
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export default function _ApolloProvider({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
