import { React, useState, useEffect, useContext } from "react";
import Loader from "../loader/Loader";
import TopNavbar from "../navbar/Navbar";
import Spinner from "../spinner/Spinner";
import AuthUser from "../../store/auth-context";
import People from "./coursetabs/People";
import {
  BrowserRouter,
  useHistory,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Subjects from "./coursetabs/Subjects";

const Course = () => {
  const ctx = useContext(AuthUser);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [showSpin, setShowSpin] = useState(false);
  const fetchData = (signal) => {
    const one = () => {
      return new Promise((resolve, reject) => {
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
            var result = allOrg.find((obj) => {
              return obj.name === localStorage.getItem("organisation");
            });
            // result = { ...result, branches: findBranch(result.branches) };
            // console.log(result, "mehu2");

            // setOrganisation(result[0]);
            // console.log(result[0], "helloojii");
            ctx.setDataOrganisation((prevState) => {
              return {
                ...prevState,
                id: result.id,
                ...result,
              };
            });
            const branches = [];
            for (const key in result.branches) {
              branches.push({
                id: key,
                ...result.branches[key],
              });
            }
            var dataBranch1 = branches.find(
              (o) => o.name.trim() === localStorage.getItem("branch").trim()
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
            ctx.setDataBranch(
              branches.find(
                (o) => o.name === localStorage.getItem("branch").trim()
              )
            );
            resolve(true);
            // ctx.setBranches(branches);
            // setShowSpin(false);

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
              console.log(err);
              // setError(err);
            }
          });
      });
    };

    const two = () => {
      fetch(
        `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements.json`,
        { signal: signal }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const allAnnounce = [];

          for (const key in data) {
            allAnnounce.push({
              id: key,
              organisation: data[key].organisation,
              role: data[key].role,
              subject: data[key].subject,
              text: data[key].text,
              branch: data[key].branch,
              //   subjects: data[key].subjects,
            });
          }

          ctx.setAllAnnouncements((prevState) => {
            return {
              ...prevState,
              hodAnnouncements: allAnnounce.filter((obj) => {
                return (
                  obj.organisation === localStorage.getItem("organisation") &&
                  obj.role === 1
                );
              }),
            };
          });
          // ctx.setAllAnnouncements((prevState) => {
          //   return {
          //     ...prevState,
          //     teacherAnnouncements: allAnnounce.filter((obj) => {
          //       return (
          //         obj.organisation === localStorage.getItem("organisation") &&
          //         obj.role === 2 &&
          //         obj.branch === localStorage.getItem("branch").trim()
          //       );
          //     }),
          //   };
          // });
          // resolve();
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          } else {
            console.log(err);
            // setError(err);
          }
        });
    };
    const calls = async () => {
      await one();
      two();
    };
    calls();
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (
      localStorage.getItem("loggedIn") === "stud00" ||
      localStorage.getItem("loggedIn") === "guest"
    ) {
      setLoading(false);
      if (!ctx.allAnnouncements.hodAnnouncements.length) {
        fetchData(signal);
      }
    } else {
      history.push("/");
    }
    return () => controller.abort();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavbar />
          {ctx.allAnnouncements.hodAnnouncements.length !== 0 ? (
            <>
              <div className="container" style={{ paddingTop: 30 }}>
                <div className="row">
                  <span className="headingTopic">
                    {localStorage.getItem("organisation")}
                  </span>
                </div>

                <div className="row">
                  <div className="shadow p-3 mb-5 bg-body rounded">
                    <div className="row justify-content-between">
                      <div className="col-auto boldFontSubHeading">
                        <h3>
                          <span
                            className="badge"
                            style={{ backgroundColor: "#BB0000" }}
                          >
                            Branch Structure
                          </span>
                        </h3>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-auto"
                        style={{ marginTop: 3, marginRight: 10 }}
                      >
                        <h6>
                          <span className="badge alert-primary rounded-pill ">
                            {localStorage.getItem("branchname")}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <ul
                      className="nav nav-pills mb-3 justify-content-center subheadingTopic"
                      id="pills-tab"
                      role="tablist "
                      style={{ marginTop: 40 }}
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-subjects-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-subjects"
                          type="button"
                          role="tab"
                          aria-controls="pills-subjects"
                          aria-selected="true"
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Subjects&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-people-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-people"
                          type="button"
                          role="tab"
                          aria-controls="pills-people"
                          aria-selected="false"
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;People&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content row" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-subjects"
                        role="tabpanel"
                        aria-labelledby="pills-subjects-tab"
                      >
                        <Subjects />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-people"
                        role="tabpanel"
                        aria-labelledby="pills-people-tab"
                      >
                        <People />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="row justify-content-center">
              <Spinner />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Course;
