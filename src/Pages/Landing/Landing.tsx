import React from "react";
import FAQ from "./components/FAQ/FAQ";
import Hero from "./components/Hero/Hero";
import styles from "./Landing.module.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Timeline from "./components/Timeline/Timeline";
import Services from "./components/Services/Services";
import Testimonial from "./components/Testimonial/Testimonial";

const LandingPage = () => {
  return (
    <div className={styles.landing}>
      <Navbar />
      <Hero />
      <Services />
      <Timeline />
      <Testimonial />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
