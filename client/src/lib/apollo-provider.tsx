"use client";
import React, { ReactNode } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

interface Props {
  children?: ReactNode;
}
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: {
            // Don't cache separate results based on

            // any of this field's arguments.

            keyArgs: false,

            // Concatenate the incoming list items with

            // the existing list items.

            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

export default function _ApolloProvider({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
