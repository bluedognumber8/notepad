"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";

type Status = "idle" | "loading" | "error";
type Credentials = { username: string; password: string; email: string };
interface FormAuth {
  handleSubmit: () => void;
  isSingUp: boolean;
  status: Status;
  handleChangeForm: () => void;
  credentials: Credentials;
  setCredentials: (credentials: Credentials) => void;
}

function FormAuth({
  handleSubmit,
  credentials,
  setCredentials,
  isSingUp,
  handleChangeForm,
  status,
}: FormAuth) {
  const id = React.useId();
  const usernameId = `${id}-username`;
  const passwordId = `${id}-password`;
  const emailId = `${id}-email`;
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <label htmlFor={usernameId}>Username:</label>
        <Input
          type="text"
          id={usernameId}
          value={credentials.username}
          disabled={status === "loading"}
          onChange={(event) => {
            setCredentials({ ...credentials, username: event.target.value });
          }}
        />
        <label htmlFor={passwordId}>Password:</label>
        <Input
          type="password"
          id={passwordId}
          value={credentials.password}
          disabled={status === "loading"}
          onChange={(event) => {
            setCredentials({ ...credentials, password: event.target.value });
          }}
        />
        {isSingUp && (
          <>
            <label htmlFor={emailId}>Email:</label>
            <Input
              type="email"
              id={emailId}
              value={credentials.email}
              onChange={(event) => {
                setCredentials({
                  ...credentials,
                  email: event.target.value,
                });
              }}
              disabled={status === "loading"}
            />
          </>
        )}
        <Button type="submit" disabled={status === "loading"}>
          {isSingUp ? "Sign up" : "Login"}
        </Button>
        <p>
          {isSingUp ? " Already have an account? " : "No account? "}
          <Link href={"#"} onClick={handleChangeForm}>
            {isSingUp ? "Log in" : "Create one"}
          </Link>
        </p>
        {status === "loading" && (
          <p>{isSingUp ? "Signing up..." : "Logging in..."}</p>
        )}
        {status === "error" && (
          <p>{isSingUp ? "Can't create account" : "Error logging in"}</p>
        )}
      </Form>
    </Wrapper>
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
export default FormAuth;
