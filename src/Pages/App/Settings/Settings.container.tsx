import React from "react";
import Settings from "./Settings";
import { useAppSelector } from "Store/Hooks";

const SettingsContainer = () => {
  const { user } = useAppSelector((state) => state.user);

  return <Settings user={user} />;
};

export default SettingsContainer;
