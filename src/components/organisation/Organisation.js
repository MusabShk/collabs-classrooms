import { useContext, useEffect } from "react";
import { useState } from "react";
import Spinner from "../spinner/Spinner";
import TopNavbar from "../navbar/Navbar";
import {
  BrowserRouter,
  useHistory,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import CardRow from "../card/CardRow";
import OrganisationHod from "../forms/OrganisationHod";
import OrganisationBody from "../card/OrganisationBody";

const Organisation = () => {
  const history = useHistory();
  const [organisation, setOrganisation] = useState({
    id: "",
    name: "",
    type: "",
    hod: {},
    branches: {},
  });
  const [loading, setLoading] = useState(true);
  //   const [auth, setAuth] = useState("");

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "adm1") {
    } else {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data, "dataa");
        const allOrg = [];

        // let res;
        // for (const [key, value] of Object.entries(data)) {
        //   if (value.name === localStorage.getItem("organisation")) {
        //     res = {
        //       id: key,
        //       ...value,
        //     };

        //     break;
        //   }
        // }

        // console.log({ res });
        // setOrganisation(res);

        for (const key in data) {
          allOrg.push({
            id: key,
            name: data[key].name,
            type: data[key].type,
            hod: data[key].hod,
            branches: data[key].branches,
          });
        }
        // console.log(allOrg, "aaa");
        var result = allOrg.filter((obj) => {
          return obj.name === localStorage.getItem("organisation");
        });
        // console.log(result, "mehu");
        setOrganisation(result[0]);

        setOrganisation((prevState) => {
          return {
            ...prevState,
            id: result[0].id,
            name: result[0].name,
            type: result[0].type,
            hod: result[0].hod,
            branches: result[0].branches,
          };
        });
        setLoading(false);
      });
  }, []);
  // console.log(organisation);
  return (
    <div>
      <TopNavbar />
      {loading ? (
        <div className="row justify-content-center">
          <Spinner />
        </div>
      ) : (
        <div className="container" style={{ paddingTop: 30 }}>
          <div className="row">
            <CardRow name={localStorage.getItem("organisation")} />
          </div>
          <div className="row" style={{ paddingTop: 30 }}>
            <div className="col-md-3">
              <div className="alert alert-primary">
                <div className="text-center">
                  <h2>
                    <span className="badge bg-light alert-primary">HOD</span>
                  </h2>
                  <p className="fw-lighter" style={{ fontSize: 12 }}>
                    Tap on field to edit
                  </p>
                  <OrganisationHod
                    hod={organisation.hod}
                    id={organisation.id}
                  />
                </div>
                <div className="row"></div>
              </div>
            </div>
            <div className="col">
              <OrganisationBody
                id={organisation.id}
                branches={organisation.branches}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Organisation;
