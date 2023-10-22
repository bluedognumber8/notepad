"use client";
import React from "react";
import { CREATE_NEW_NOTE, GET_NOTE_FEED } from "@/graphql";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

function Page() {
  const id = React.useId();
  const router = useRouter();

  const textfieldId = `${id}-textfield`;
  const [textfield, setTextfield] = React.useState("");
  const [newNote, { loading, error }] = useMutation(CREATE_NEW_NOTE, {
    refetchQueries: [{ query: GET_NOTE_FEED }],
    onCompleted: (data) => {
      router.push(`/notes/${data.newNote.id}`);
    },
  });
  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    newNote({
      variables: {
        content: textfield,
      },
    });
  }
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <label htmlFor={textfieldId}></label>
        <textarea
          id={textfieldId}
          value={textfield}
          onChange={(event) => {
            setTextfield(event.target.value);
          }}
        ></textarea>
        <button type="submit">Save</button>
      </Form>
      {loading && <p>Saving...</p>}
      {error && <p>You need to be signed in for adding notes</p>}
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
export default Page;
