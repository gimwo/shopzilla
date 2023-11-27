import { useContext } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import Footer from "../components/Footer";

function Account() {
  const { user } = useContext(UserContext);

  console.log(user);
  return user.isAdmin ? (
    <AdminView />
  ) : (
    <div>
      <UserView userId={user.id} />
    </div>
  );
}

export default Account;
