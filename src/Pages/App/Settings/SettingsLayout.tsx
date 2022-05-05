import React from "react";
import { Outlet } from "react-router-dom";
import Styles from "./Settings.module.scss";

const SettingsLayout = () => {
  return (
    <div className={Styles.settings}>
      <Outlet />
    </div>
  );
};

export default SettingsLayout;
