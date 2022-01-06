import Loader from "../loader/Loader";
import TopNavbar from "../navbar/Navbar";
import Spinner from "../spinner/Spinner";
import { useState, useEffect, useContext, useRef } from "react";
import {
  BrowserRouter,
  useHistory,
  Redirect,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import DashboardAnnouncements from "./DashboardAnnouncements";
import AuthUser from "../../store/auth-context";

const Dashboard = () => {
  const ctx = useContext(AuthUser);
  const history = useHistory();
  const [showSpin, setShowSpin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allAnnouncements, setAllAnnouncements] = useState({
    hodAnnouncements: [],
    teacherAnnouncements: [],
  });
  // console.log(allAnnouncements);

  // const fetchData = () => {

  //   const ttt = () => {

  //   };
  //   const ooo = () => {

  //   };
  //   // const one = () => {
  //   //   setSpinnerShow(true);
  //   // };

  // };

  // useEffect(() => {
  //   // setLoading(true);
  //   if (localStorage.getItem("loggedIn") === "stud00") {
  //     setLoading(false);
  //     setShowSpin(true);
  //     fetchData();
  //   } else {
  //     history.push("/");
  //   }
  // }, [ctx.refresh]);

  // const newFetch=()=>{
  //   const a=()=>{
  //     setShowSpin(true);
  //     setLoading(false);
  //     let user;
  //     const users = [];
  //     const allOrg = [];
  //     const branches = [];
  //     let result;
  //     let dataBranch;
  //     const students = [];
  //     const subjects = [];
  //     let currentSubject;
  //     const assignments = [];
  //     const allAnnounce = [];
  //     fetch(
  //       `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation.json`,
  //       { signal: signal }
  //     )
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         for (const key in data) {
  //           allOrg.push({
  //             id: key,
  //             name: data[key].name,
  //             type: data[key].type,
  //             hod: data[key].hod,
  //             branches: data[key].branch,
  //           });
  //         }

  //         result = allOrg.filter((obj) => {
  //           return obj.name === localStorage.getItem("organisation");
  //         });

  //         ctx.setDataOrganisation((prevState) => {
  //           return {
  //             ...prevState,
  //             id: result[0].id,
  //             ...result[0],
  //           };
  //         });
  //         for (const key in result[0].branches) {
  //           branches.push({
  //             id: key,
  //             ...result[0].branches[key],
  //           });
  //         }
  //         console.log(branches);
  //         dataBranch = branches.find((o) => o.name === user.branch);
  //         console.log(dataBranch, "daf");
  //         ctx.setDataBranch(dataBranch);
  //         if (dataBranch.students) {
  //           for (const key in dataBranch.students) {
  //             students.push({
  //               id: key,
  //               ...dataBranch.students[key],
  //             });
  //           }
  //           ctx.setDataStudents(students);
  //         } else {
  //           ctx.setDataStudents(false);
  //         }

  //         if (dataBranch.subjects) {
  //           for (const key in dataBranch.subjects) {
  //             subjects.push({
  //               id: key,
  //               ...dataBranch.subjects[key],
  //             });
  //           }

  //           ctx.setDataSubjects(subjects);
  //         } else {
  //           ctx.setDataSubjects(false);
  //         }
  //       })
  //     }
  //   const b=()=>{

  //   }
  // }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    let user;
    const users = [];
    const allOrg = [];
    const branches = [];
    let result;
    let dataBranch;
    const students = [];
    const subjects = [];
    let currentSubject;
    const assignments = [];
    const allAnnounce = [];

    if (
      localStorage.getItem("loggedIn") === "stud00" ||
      localStorage.getItem("loggedIn") === "guest"
    ) {
      setShowSpin(true);
      setLoading(false);
      fetch(
        "https://crm-management-6790c-default-rtdb.firebaseio.com/users.json",
        { signal: signal }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          for (const key in data) {
            users.push({
              id: key,
              name: data[key].name,
              email: data[key].email,
              password: data[key].password,
              role: data[key].role,
              organisation: data[key].organisation,
              branch: data[key].branch,
              rollnumber: data[key].rollnumber,
            });
          }
          user = users.find(
            (x) => x.name === localStorage.getItem("crmUserName")
          );
          ctx.setUserData(user);
          // resolve();
          fetch(
            `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation.json`,
            { signal: signal }
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              // console.log(user.branch, "branchhhhh");

              for (const key in data) {
                allOrg.push({
                  id: key,
                  name: data[key].name,
                  type: data[key].type,
                  hod: data[key].hod,
                  branches: data[key].branch,
                  //   subjects: data[key].subjects,
                });
              }

              result = allOrg.filter((obj) => {
                return obj.name === localStorage.getItem("organisation");
              });
              // console.log(result, "mehu");

              ctx.setDataOrganisation((prevState) => {
                return {
                  ...prevState,
                  id: result[0].id,
                  ...result[0],
                };
              });
              for (const key in result[0].branches) {
                branches.push({
                  id: key,
                  ...result[0].branches[key],
                });
              }
              dataBranch = branches.find((o) => o.name === user.branch);
              ctx.setDataBranch(dataBranch);
              //   localStorage.setItem("branchname", dataBranch.name);
              if (dataBranch.students) {
                for (const key in dataBranch.students) {
                  students.push({
                    id: key,
                    ...dataBranch.students[key],
                  });
                }
                ctx.setDataStudents(students);
              } else {
                ctx.setDataStudents(false);
              }
              // for (const key in dataBranch.students) {
              //   students.push({
              //     id: key,
              //     ...dataBranch.students[key],
              //   });
              // }
              // ctx.setDataStudents(students);
              if (dataBranch.subjects) {
                for (const key in dataBranch.subjects) {
                  subjects.push({
                    id: key,
                    ...dataBranch.subjects[key],
                  });
                }

                ctx.setDataSubjects(subjects);
              } else {
                ctx.setDataSubjects(false);
              }
              // for (const key in dataBranch.subjects) {
              //   subjects.push({
              //     id: key,
              //     ...dataBranch.subjects[key],
              //   });
              // }
              // ctx.setDataSubjects(subjects);

              //   currentSubject = subjects.filter((obj) => {
              //     return obj.name === user.subject;
              // //   });
              //   for (const key in currentSubject[0].assignments) {
              //     assignments.push({
              //       id: key,
              //       ...currentSubject[0].assignments[key],
              //     });
              //   }
              // setAssignmentsData(assignments);
              //   ctx.setDataAssignments(assignments);
              // setSubjectData(...currentSubject);
              //   ctx.setDataSubject(...currentSubject);
              //   ctx.setDataSubjects(subjects);
              // ctx.setDataBranch(branches.find((o) => o.name === user.branch));
              // resolve();
              //   ctx.setBranches(branches);
              fetch(
                `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements.json`,
                { signal: signal }
              )
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
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
                          obj.organisation ===
                            localStorage.getItem("organisation") &&
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
                  //         obj.branch === user.branch
                  //       );
                  //     }),
                  //   };
                  // });
                  setShowSpin(false);
                  // resolve();
                })
                .catch((err) => {
                  if (err.name === "AbortError") {
                  } else {
                    console.log(err);
                    // setError(err);
                  }
                });
            })
            .catch((err) => {
              if (err.name === "AbortError") {
              } else {
                console.log(err);
                // setError(err);
              }
            });
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          } else {
            console.log(err);
            // setError(err);
          }
        });
    } else {
      history.push("/");
    }
    return () => controller.abort();
  }, [ctx.refresh]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavbar />
          {showSpin ? (
            <>
              <div className="row  justify-content-center">
                <Spinner />
              </div>
            </>
          ) : (
            <>
              <div className="container" style={{ paddingTop: 30 }}>
                <div className="row justify-content-center ">
                  <DashboardAnnouncements
                    allAnnouncements={ctx.allAnnouncements}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
