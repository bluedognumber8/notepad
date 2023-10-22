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
  const [status, setStatus] = React.useState("idle");
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
  React.useEffect(() => {
    if (loading) {
      setStatus("loading");
    } else if (error) {
      setStatus("error");
    } else {
      setStatus("idle");
    }
  }, [loading, error]);

  return (
    <>
      <UserForm form="signIn" action={signIn} status={status}>
        {loading && <p>Signing in...</p>}
        {error && <p>Error signing in</p>}
      </UserForm>
    </>
  );
}

export default App;
