import React, { PropsWithChildren } from "react";
import Container from "@mui/material/Container";
import Sidebar from "../Components/Global/Sidebar/Sidebar.component";
import Navbar from "../Components/Global/Navbar/Navbar.component";
import styles from "./AppLayout.module.scss";

type AppLayoutProps = PropsWithChildren<{}>;

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <Sidebar />
      <main className={styles.main}>
        <Navbar />
        <Container className={styles.main__container}>{children}</Container>
      </main>
    </div>
  );
};

export default AppLayout;
