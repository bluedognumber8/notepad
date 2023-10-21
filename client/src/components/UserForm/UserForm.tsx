"use client";
import React from "react";
import styled from "styled-components";

interface UserFormProps {
  form: string;
  action: any;
}
function UserForm({ form, action }: UserFormProps) {
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
        <label htmlFor={usernameId}>Username</label>
        <input
          type="text"
          id={usernameId}
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label htmlFor={passwordId}>Password</label>
        <input
          type="password"
          id={passwordId}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {form == "signUp" && (
          <>
            <label htmlFor={emailId}>Email</label>
            <input
              type="email"
              id={emailId}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </>
        )}
        <button type="submit">Submit</button>
      </Form>
    </Wrapper>
  );
}
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;
const Wrapper = styled.div`
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export default UserForm;
