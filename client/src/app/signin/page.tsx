"use client";
import React from "react";
import UserForm from "@/components/UserForm";
import { useApolloClient, useMutation } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import { CREATE_SIGN_IN } from "@/graphql";
import { useRouter } from "next/navigation";

const IS_LOGGED_IN = gql(`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`);

function App() {
  const client = useApolloClient();
  const router = useRouter();
  React.useEffect(() => {
    document.title = "Sing in";
  }, []);
  const [signIn, { loading, error }] = useMutation(CREATE_SIGN_IN, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.signIn);
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });
      router.push("/");
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error signing in</p>;

  return <UserForm form="signIn" action={signIn} />;
}

export default App;
