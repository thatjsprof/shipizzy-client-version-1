import toast from "react-hot-toast";
import { useAppSelector } from "Store/Hooks";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = (props: { children: React.ReactElement }) => {
  const { children } = props;
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!isAuthenticated) {
      if (location.pathname !== requestedLocation) {
        setRequestedLocation(location.pathname);
      }

      toast.error("Your Session has expired. Please Login again");
    }
  }, [isAuthenticated, location, requestedLocation]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
