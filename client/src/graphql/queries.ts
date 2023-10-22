import { gql } from "@/__generated__/gql";

export const GET_IS_USER_LOGGED_IN = gql(`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`);

export const GET_NOTE_FEED = gql(`
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
export const GET_ME = gql(`
query Me {
  me {
    avatar
    username
  }
}
`);
