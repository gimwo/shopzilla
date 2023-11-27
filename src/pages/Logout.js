import { useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

function Logout() {
  const { setUser, unsetUser } = useContext(UserContext);
  unsetUser();

  useEffect(() => {
    setUser({
      id: null,
      isAdmin: null,
    });
  }, []);

  return <Navigate to="/login" />;
}

export default Logout;
