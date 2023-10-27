"use client";
import React from "react";
import styled from "styled-components";

type UserFormAction = (args: Partial<{ variables: Variables }>) => void;

interface Variables {
  username: string;
  password: string;
  email: string;
}
type Status = "idle" | "loading" | "success" | "error";
type Form = "signUp" | "signIn";

interface UserFormProps {
  form: Form;
  action: UserFormAction;
  status: Status;
  children?: React.ReactNode;
}
function UserForm({ form, action, children, status }: UserFormProps) {
  const id = React.useId();
  const usernameId = `${id}-username`;
  const passwordId = `${id}-password`;
  const emailId = `${id}-email`;
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    action({
      variables: {
        username,
        password,
        email,
      },
    });
  }
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <label htmlFor={usernameId}>Username:</label>
        <Input
          type="text"
          id={usernameId}
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          disabled={status === "loading"}
        />
        <label htmlFor={passwordId}>Password:</label>
        <Input
          type="password"
          id={passwordId}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          disabled={status === "loading"}
        />
        {form == "signUp" && (
          <>
            <label htmlFor={emailId}>Email:</label>
            <Input
              type="email"
              id={emailId}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              disabled={status === "loading"}
            />
          </>
        )}
        <Button type="submit" disabled={status === "loading"}>
          {form === "signUp" ? "Sign up" : "Login"}
        </Button>
        {form === "signUp"
          ? status === "loading" && <p>Signing up...</p>
          : status === "loading" && <p>Logging in...</p>}

        {form === "signUp"
          ? status === "error" && <p>Can&apos;t create account</p>
          : status === "error" && <p>Error logging in</p>}
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

export default UserForm;
