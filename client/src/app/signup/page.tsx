"use client";
import React from "react";
import UserForm from "@/components/UserForm";
import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_SIGN_UP, GET_IS_USER_LOGGED_IN } from "@/graphql";
import { useRouter } from "next/navigation";

function App() {
  const client = useApolloClient();
  const router = useRouter();
  type Status = "idle" | "loading" | "error";
  const [status, setStatus] = React.useState<Status>("idle");
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
      <UserForm form="signUp" action={signUp} status={status} />
    </>
  );
}

export default App;
