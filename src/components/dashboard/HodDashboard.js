import { useContext, useEffect } from "react";
import { useState } from "react";
import Spinner from "../spinner/Spinner";
import {
  BrowserRouter,
  useHistory,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import TopNavbar from "../navbar/Navbar";
import AuthUser from "../../store/auth-context";
import DashboardBody from "../hod/DashboardBody";
import Loader from "../loader/Loader";
const HodDashboard = () => {
  const ctx = useContext(AuthUser);
  // const userData = useUser();
  // const fetchUser = useUserFinder();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      localStorage.getItem("loggedIn") === "hod21" ||
      localStorage.getItem("loggedIn") === "guest"
    ) {
      setLoading(false);
    } else {
      history.push("/");
    }
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <TopNavbar />
          <div className="container" style={{ paddingTop: 30 }}>
            <DashboardBody />
          </div>
        </div>
      )}
    </div>
  );
};

export default HodDashboard;
