"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <header
      className={`${styles.header} ${
        isHomePage ? styles.homeHeader : styles.pageHeader
      }`}
    >
      <Link href="/" className={styles.logo}>
        LES PETITS PLATS
      </Link>
    </header>
  );
}