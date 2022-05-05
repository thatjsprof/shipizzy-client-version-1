import React from "react";
import Hero from "./components/Hero/Hero";
import styles from "./Landing.module.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const LandingPage = () => {
  return (
    <div className={styles.landing}>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default LandingPage;
