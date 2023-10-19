import * as React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.wrapper}>
      Page rendered on {new Date().toLocaleString()}
    </div>
  );
}

export default Footer;
