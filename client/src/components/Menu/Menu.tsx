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
    <Nav>
      {links.map((link, index) => {
        return (
          <NavLink key={index} href={link.url}>
            {link.name}
          </NavLink>
        );
      })}
      {isLoggedIn ? (
        <NavLink
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
        </NavLink>
      ) : (
        <>
          <NavLink href="/signin">Login</NavLink>
        </>
      )}
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  gap: 40px;
  margin-left: 40px;
  margin-right: 40px;
`;

const NavLink = styled(Link)`
  min-width: max-content;
  text-transform: uppercase;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.3rem;
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
