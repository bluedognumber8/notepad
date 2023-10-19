import React from "react";
import styles from "./Menu.module.css";
import Link from "next/link";

const links = [
  { name: "Notes", url: "/notes" },
  { name: "Favorite", url: "/favorite" },
  { name: "Profile", url: "/profile" },
  { name: "SignUp", url: "/signup" },
  { name: "SignIn", url: "/profile" },
];
function Menu() {
  return (
    <ul className={styles.wrapper}>
      {links.map((link, index) => {
        return (
          <Link className={styles.element} key={index} href={link.url}>
            <li>{link.name}</li>
          </Link>
        );
      })}
    </ul>
  );
}

export default Menu;
