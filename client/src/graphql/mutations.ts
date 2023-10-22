import { gql } from "@/__generated__/gql";

export const CREATE_SIGN_UP = gql(`
    mutation SignUp($username: String!, $password: String!, $email: String!) {
      signUp(username: $username, password: $password, email: $email)
    }
  `);

export const CREATE_SIGN_IN = gql(`
    mutation SignIn($username: String,$password: String!,  $email: String) {
  signIn(username: $username, password: $password, email: $email)
}
  `);
export const CREATE_NEW_NOTE = gql(`
   mutation NewNote($content: String!) {
  newNote(content: $content) {
    content
    id
  }
}


  `);
