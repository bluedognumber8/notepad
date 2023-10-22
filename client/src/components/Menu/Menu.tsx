"use client";
import React from "react";
import Link from "next/link";
import { useQuery, useApolloClient } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";

const links = [
  { name: "New note", url: "/new" },
  { name: "Notes", url: "/notes" },
  { name: "Favorite", url: "/favorite" },
  { name: "Profile", url: "/profile" },
];

const IS_LOGGED_IN = gql(`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`);

function Menu() {
  const client = useApolloClient();
  const { data } = useQuery(IS_LOGGED_IN);
  const [isLoggedIn, setisLoggedIn] = React.useState(false);
  React.useEffect(() => {
    setisLoggedIn(!!data?.isLoggedIn);
  }, [data]);
  const router = useRouter();

  return (
    <Ul>
      {links.map((link, index) => {
        return (
          <StyledLink key={index} href={link.url}>
            <li>{link.name}</li>
          </StyledLink>
        );
      })}
      {isLoggedIn ? (
        <StyledLink
          href="#"
          onClick={() => {
            localStorage.removeItem("token");
            setisLoggedIn(false);
            client.writeQuery({
              query: IS_LOGGED_IN,
              data: {
                isLoggedIn: false,
              },
            });
            router.push("/");
          }}
        >
          Log out
        </StyledLink>
      ) : (
        <>
          <StyledLink href="/signin">
            <li>SignIn</li>
          </StyledLink>
          <StyledLink href="/signup">
            <li>SignUp</li>
          </StyledLink>
        </>
      )}
    </Ul>
  );
}

const Ul = styled.ul`
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  list-style-type: none;
  width: 100%;
`;

const StyledLink = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  &:hover {
    animation: scale 500ms;
  }
  @keyframes scale {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
`;

export default Menu;
