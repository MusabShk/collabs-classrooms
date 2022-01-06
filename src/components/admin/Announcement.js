import { useContext, useEffect } from "react";
import { useState } from "react";
import Spinner from "../spinner/Spinner";
import { BrowserRouter, useHistory, Redirect } from "react-router-dom";
import TopNavbar from "../navbar/Navbar";
// import AuthUser from "../../store/auth-context";
// import { useUser, useUserFinder } from "../../store/auth-context";
import Loader from "../loader/Loader";
const Announcement = () => {
  //   const ctx = useContext(AuthUser);
  // const userData = useUser();
  // const fetchUser = useUserFinder();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  //   const [auth, setAuth] = useState("");

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "adm1") {
      setLoading(false);
    } else {
      history.push("/");
    }
  }, []);
  // console.log(ctx.UserData, "dsss");
  // console.log(userData, "indash");
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <TopNavbar />
        </div>
      )}
    </div>
  );
};

export default Announcement;
