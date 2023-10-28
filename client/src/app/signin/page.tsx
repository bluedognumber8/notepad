"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import useAuthMutation from "@/hooks/useAuthMutation";
import { CREATE_SIGN_IN, CREATE_SIGN_UP } from "@/graphql";
import FormAuth from "@/components/FormAuth";

function App() {
  type Status = "idle" | "loading" | "error";
  const [status, setStatus] = React.useState<Status>("idle");
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
    email: "",
  });

  const [isSingUp, setIsSingUp] = React.useState(false);
  React.useEffect(() => {
    document.title = isSingUp ? "Sing up" : "Sing in";
  }, [isSingUp]);

  const {
    executeMutation: signIn,
    loading: signInLoading,
    error: signInError,
  } = useAuthMutation(CREATE_SIGN_IN);
  const {
    executeMutation: signUp,
    loading: signUpLoading,
    error: signUpError,
  } = useAuthMutation(CREATE_SIGN_UP);

  React.useEffect(() => {
    if (signInLoading || signUpLoading) {
      setStatus("loading");
    } else if (signInError || signUpError) {
      setStatus("error");
    } else {
      setStatus("idle");
    }
  }, [signInLoading, signUpLoading, signInError, signUpError]);

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const action = isSingUp ? signUp : signIn;
    action({ variables: credentials });
  }

  function handleChangeForm() {
    setStatus("idle");
    setIsSingUp(!isSingUp);
    setCredentials({
      username: "",
      password: "",
      email: "",
    });
  }

  return (
    <FormAuth
      credentials={credentials}
      handleSubmit={handleSubmit}
      setCredentials={setCredentials}
      handleChangeForm={handleChangeForm}
      isSingUp={isSingUp}
      status={status}
    />
  );
}
const Wrapper = styled.div`
  max-width: 300px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 116, 211, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
  padding: 20px;
`;
const Input = styled.input``;
const Button = styled.button`
  align-self: center;
  margin: 1em 0;
  width: 200px;
  height: 40px;
`;
export default App;
