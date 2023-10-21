"use client";
import React, { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

interface Props {
  children?: ReactNode;
}
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: "http://localhost:4000",
  cache,
  resolvers: {},
});
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

if (typeof window !== "undefined") {
  console.log("checking token:");
  cache.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: !!localStorage.getItem("token") || false,
    },
  });
}

export default function _ApolloProvider({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
