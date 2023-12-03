import type { NextPage } from "next";
import styles from "./index.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* Usually I make this a component then include it in the pages so each page has their own unique title */}
      <head>
        <title>Part 3 - Next and React Component</title>
      </head>
      <div className="container">
        <header className={styles.header}>
          <div>Header with Logo</div>
          <nav>nav items here</nav>
        </header>
        <main>{children}</main>
        <footer>Footer goes here</footer>
      </div>
    </>
  );
}
