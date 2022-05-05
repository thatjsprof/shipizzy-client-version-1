import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import Container from "@mui/material/Container";
import Navbar from "../Components/Global/Navbar/Navbar.component";
import Sidebar from "../Components/Global/Sidebar/Sidebar.component";

const AppLayout = () => {
  return (
    <div>
      <Sidebar />
      <main className={styles.main}>
        <Navbar />
        <Container className={styles.main__container}>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default AppLayout;
