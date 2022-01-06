import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  BrowserRouter,
  useHistory,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
// import AddBranch from "../forms/AddBranch";
import AuthUser from "../../store/auth-context";
import Loader from "../loader/Loader";
import Spinner from "../spinner/Spinner";
import TopNavbar from "../navbar/Navbar";
import BranchBody from "./BranchBody";

const Branch = () => {
  const params = useParams();

  const ctx = useContext(AuthUser);
  const [refresh, setRefresh] = useState(true);
  const [showSpin, setShowSpin] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (
      localStorage.getItem("loggedIn") === "hod21" ||
      localStorage.getItem("loggedIn") === "guest"
    ) {
      localStorage.setItem("branchname", params.branch);
      // console.log(params.branch);
      // fetch(
      //   `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation.json`
      // )
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     // console.log(data, "dataaaaaa");
      //     const allOrg = [];
      //     // const findBranch = (x) => {
      //     //   console.log(x, "xxx");
      //     //   // x.filter((obj) => {
      //     //   //   return obj.branches;
      //     //   // });
      //     // };
      //     // console.log(branch, "branch");
      //     for (const key in data) {
      //       allOrg.push({
      //         id: key,
      //         name: data[key].name,
      //         type: data[key].type,
      //         hod: data[key].hod,
      //         branches: data[key].branch,
      //       });
      //     }

      //     // console.log(allOrg, "aaa");
      //     var result = allOrg.filter((obj) => {
      //       return obj.name === localStorage.getItem("organisation");
      //     });
      //     console.log(result, "mehu");
      //     // result = { ...result, branches: findBranch(result.branches) };
      //     // console.log(result, "mehu2");
      //     let organisation={
      //       id: result[0].id,
      //       ...result[0],
      //     }
      //     // setOrganisation(result[0]);
      //     // console.log(result[0], "helloojii");
      //     // ctx.setDataOrganisation((prevState) => {
      //     //   return {
      //     //     ...prevState,
      //     //     id: result[0].id,
      //     //     ...result[0],
      //     //   };
      //     // });
      //     // setOrganisation((prevState) => {
      //     //   return {
      //     //     ...prevState,
      //     //     id: result[0].id,
      //     //     ...result[0],
      //     //     // name: result[0].name,
      //     //     // type: result[0].type,
      //     //     // hod: result[0].hod,
      //     //     // branches: result[0].branches.hasOwnProperty(),
      //     //   };
      //     // });
      //     // ctx.setDataOrganisation(organisation);
      //     // console.log(organisation, "da");

      //     // console.log("billii");
      //   });

      setLoading(false);
      setShowSpin(true);
      fetch(
        `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation.json`,
        { signal: signal }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data, "dataaaaaa");
          const allOrg = [];
          // const findBranch = (x) => {
          //   console.log(x, "xxx");
          //   // x.filter((obj) => {
          //   //   return obj.branches;
          //   // });
          // };
          // console.log(branch, "branch");
          for (const key in data) {
            allOrg.push({
              id: key,
              name: data[key].name,
              type: data[key].type,
              hod: data[key].hod,
              branches: data[key].branch,
            });
          }

          // console.log(allOrg, "aaa");
          var result = allOrg.filter((obj) => {
            return obj.name === localStorage.getItem("organisation");
          });
          // result = { ...result, branches: findBranch(result.branches) };
          // console.log(result, "mehu2");

          // setOrganisation(result[0]);
          // console.log(result[0], "helloojii");
          ctx.setDataOrganisation((prevState) => {
            return {
              ...prevState,
              id: result[0].id,
              ...result[0],
            };
          });
          const branches = [];
          for (const key in result[0].branches) {
            branches.push({
              id: key,
              ...result[0].branches[key],
            });
          }
          var dataBranch1 = branches.find(
            (o) => o.name.trim() === params.branch.trim()
          );
          // var dataBranch = branches.filter((obj) => {
          //   return obj.name.trim() === params.branch.trim();
          // });
          // console.log(dataBranch, "lets seee");
          const students = [];
          if (dataBranch1.students) {
            for (const key in dataBranch1.students) {
              students.push({
                id: key,
                ...dataBranch1.students[key],
              });
            }
            ctx.setDataStudents(students);
          } else {
            ctx.setDataStudents(false);
          }
          // let dataBranch = branches.find((o) => o.name === params.branch);
          const subjects = [];
          if (dataBranch1.subjects) {
            for (const key in dataBranch1.subjects) {
              subjects.push({
                id: key,
                ...dataBranch1.subjects[key],
              });
            }

            ctx.setDataSubjects(subjects);
          } else {
            ctx.setDataSubjects(false);
          }
          ctx.setDataBranch(branches.find((o) => o.name === params.branch));
          ctx.setBranches(branches);
          setShowSpin(false);

          // setOrganisation((prevState) => {
          //   return {
          //     ...prevState,
          //     id: result[0].id,
          //     ...result[0],
          //     // name: result[0].name,
          //     // type: result[0].type,
          //     // hod: result[0].hod,
          //     // branches: result[0].branches.hasOwnProperty(),
          //   };
          // });
          // ctx.setDataOrganisation(organisation);
          // console.log(organisation, "da");

          // console.log("billii");
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          } else {
            // setError(err);
            console.log(err);
          }
        });
      // fetch(
      //   `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch.json`
      // )
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     console.log(data, "dt");
      //     const branches = [];
      //     for (const key in data) {
      //       branches.push({
      //         id: key,
      //         ...data[key],
      //       });
      //     }
      //     // ctx.setDataBranch(branches.find((o) => o.name === params.branch));
      //     // ctx.setBranches(branches);
      //     let dataBranch = branches.find((o) => o.name === params.branch);
      //     // console.log(dataBranch, "dath");
      //     console.log(dataBranch, "datab");
      //     const subjects = [];
      //     if (dataBranch.subjects !== false) {
      //       for (const key in dataBranch.subjects) {
      //         subjects.push({
      //           id: key,
      //           ...dataBranch.subjects[key],
      //         });
      //       }
      //       ctx.setDataSubjects(subjects);
      //     }
      //     ctx.setDataBranch(branches.find((o) => o.name === params.branch));
      //     setLoading(false);
      //     //   setAgain((prevState) => !prevState);
      //     //   // props.setRefresh();
      //     // });
      //   });
      // if (ctx.branches) {
      //   setLoading(false);
      // } else {
      //   history.push(`/${localStorage.getItem("organisation")}/hod/dashboard`);
      // }
    } else {
      history.push("/");
    }

    return () => controller.abort();
  }, [ctx.refresh, params.branch]);

  const refreshHandler = () => {
    setRefresh((prevState) => !prevState);
  };

  // console.log(params.branch, "asdasdf");
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {showSpin ? (
            <>
              <TopNavbar />
              <div className="row justify-content-center">
                <Spinner />
              </div>
            </>
          ) : (
            <div>
              <TopNavbar />
              <div className="container" style={{ paddingTop: 30 }}>
                <BranchBody setRefresh={refreshHandler} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Branch;
