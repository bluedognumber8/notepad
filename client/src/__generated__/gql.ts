/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Query($noteId: ID!) {\n  note(id: $noteId) {\n    author {\n      avatar\n      email\n      username\n    }\n    content\n    createdAt\n    favoriteCount\n    updatedAt\n  }\n}\n": types.QueryDocument,
    "\n  query IsUserLoggedIn {\n    isLoggedIn @client\n  }\n": types.IsUserLoggedInDocument,
    "\n    mutation SignUp($username: String!, $password: String!, $email: String!) {\n      signUp(username: $username, password: $password, email: $email)\n    }\n  ": types.SignUpDocument,
    "\n    mutation SignIn($username: String,$password: String!,  $email: String) {\n  signIn(username: $username, password: $password, email: $email)\n}\n  ": types.SignInDocument,
    "\n   mutation NewNote($content: String!) {\n  newNote(content: $content) {\n    content\n    id\n  }\n}\n\n\n  ": types.NewNoteDocument,
    "\n  query noteFeed($cursor: String) {\n  noteFeed(cursor: $cursor) {\n    cursor\n    hasNextPage\n    notes {\n      id\n      createdAt\n      content\n      favoriteCount\n      author {\n        username\n        id\n        avatar\n      }\n    }\n  }\n}\n": types.NoteFeedDocument,
    "\nquery Me {\n  me {\n    avatar\n    username\n  }\n}\n": types.MeDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Query($noteId: ID!) {\n  note(id: $noteId) {\n    author {\n      avatar\n      email\n      username\n    }\n    content\n    createdAt\n    favoriteCount\n    updatedAt\n  }\n}\n"): (typeof documents)["\n  query Query($noteId: ID!) {\n  note(id: $noteId) {\n    author {\n      avatar\n      email\n      username\n    }\n    content\n    createdAt\n    favoriteCount\n    updatedAt\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query IsUserLoggedIn {\n    isLoggedIn @client\n  }\n"): (typeof documents)["\n  query IsUserLoggedIn {\n    isLoggedIn @client\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation SignUp($username: String!, $password: String!, $email: String!) {\n      signUp(username: $username, password: $password, email: $email)\n    }\n  "): (typeof documents)["\n    mutation SignUp($username: String!, $password: String!, $email: String!) {\n      signUp(username: $username, password: $password, email: $email)\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation SignIn($username: String,$password: String!,  $email: String) {\n  signIn(username: $username, password: $password, email: $email)\n}\n  "): (typeof documents)["\n    mutation SignIn($username: String,$password: String!,  $email: String) {\n  signIn(username: $username, password: $password, email: $email)\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n   mutation NewNote($content: String!) {\n  newNote(content: $content) {\n    content\n    id\n  }\n}\n\n\n  "): (typeof documents)["\n   mutation NewNote($content: String!) {\n  newNote(content: $content) {\n    content\n    id\n  }\n}\n\n\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query noteFeed($cursor: String) {\n  noteFeed(cursor: $cursor) {\n    cursor\n    hasNextPage\n    notes {\n      id\n      createdAt\n      content\n      favoriteCount\n      author {\n        username\n        id\n        avatar\n      }\n    }\n  }\n}\n"): (typeof documents)["\n  query noteFeed($cursor: String) {\n  noteFeed(cursor: $cursor) {\n    cursor\n    hasNextPage\n    notes {\n      id\n      createdAt\n      content\n      favoriteCount\n      author {\n        username\n        id\n        avatar\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Me {\n  me {\n    avatar\n    username\n  }\n}\n"): (typeof documents)["\nquery Me {\n  me {\n    avatar\n    username\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;