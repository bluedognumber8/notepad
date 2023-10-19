import React from "react";
import styles from "./Header.module.css";
import Logo from "../../components/Logo";
import Menu from "../../components/Menu";
function Header() {
  return (
    <header className={styles.wrapper}>
      <Logo />
      <Menu />
    </header>
  );
}

export default Header;
