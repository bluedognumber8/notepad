import React from "react";
import Link from "next/link";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link href="/" className={styles.wrapper}>
      Notepad
    </Link>
  );
}

export default Logo;
