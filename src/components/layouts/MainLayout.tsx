import type { PropsWithChildren } from "react";
import { Header } from "./Header";
import { ScrollTop } from "../features/ScrollTop/ScrollTop";
import styles from "@/styles/partials/main-layout.module.scss";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className={styles.main}>
      <Header />
      <div className="container">{children}</div>
      <ScrollTop />
    </main>
  );
};

MainLayout.displayName = "MainLayout";
