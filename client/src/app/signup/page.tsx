"use client";
import React from "react";
import UserForm from "@/components/UserForm";
import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_SIGN_UP, GET_IS_USER_LOGGED_IN } from "@/graphql";
import { useRouter } from "next/navigation";

function App() {
  const client = useApolloClient();
  const router = useRouter();
  React.useEffect(() => {
    document.title = "Sing up";
  }, []);
  const [signUp, { loading, error }] = useMutation(CREATE_SIGN_UP, {
    onCompleted: (data) => {
      client.writeQuery({
        query: GET_IS_USER_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });
      localStorage.setItem("token", data.signUp);
      router.push("/");
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error creating account</p>;
  return <UserForm form="signUp" action={signUp} />;
}

export default App;
