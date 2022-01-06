import { React, useEffect, useContext, useState } from "react";
import { MdOutlineAssignment } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthUser from "../../../store/auth-context";
import Spinner from "../../spinner/Spinner";
import TopNavbar from "../../navbar/Navbar";
import Loader from "../../loader/Loader";
import BarChart from "../../teacher/experiment/BarChart";
import { AiOutlineFile } from "react-icons/ai";

const Dashboard = () => {
  const history = useHistory();
  // const [loader,setLoader]=useState(true)
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const ctx = useContext(AuthUser);
  const fetchData = (signal) => {
    // console.log("hiii");
    const aa = () => {
      setLoading(false);

      return new Promise((resolve, reject) => {
        fetch(
          `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation.json`,
          { signal: signal }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const allOrg = [];

            for (const key in data) {
              allOrg.push({
                id: key,
                name: data[key].name,
                type: data[key].type,
                hod: data[key].hod,
                branches: data[key].branch,
              });
            }

            var result = allOrg.filter((obj) => {
              return obj.name === localStorage.getItem("organisation");
            });

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
            ctx.setDataBranch(branches.find((o) => o.name === params.branch));
            ctx.setBranches(branches);
            let dataBranch = branches.find((o) => o.name === params.branch);
            const subjects = [];
            for (const key in dataBranch.subjects) {
              subjects.push({
                id: key,
                ...dataBranch.subjects[key],
              });
            }
            ctx.setDataSubjects(subjects);

            var currentSubject = subjects.find((obj) => {
              return obj.name === params.subjectname.trim();
            });
            const assignments = [];
            for (const key in currentSubject.assignments) {
              assignments.push({
                id: key,
                ...currentSubject.assignments[key],
              });
            }
            // setAssignmentsData(assignments);
            ctx.setDataAssignments(assignments);
            var ass = assignments.filter((obj) => {
              return obj.id === params.assignmentid;
            });
            ctx.setDataAssignment(...ass);
            let ex = { ...ass };
            // currentSubject = dataBranch1.subjects.find((obj) => {
            //   return obj.name === user.subject;
            // });
            // for (const key in currentSubject[0].assignments) {
            //   assignments.push({
            //     id: key,
            //     ...currentSubject[0].assignments[key],
            //   });
            // }
            // setSubjectData(...currentSubject);
            if (ex[0].files.faculty !== false) {
              // const url=[]
              // console.log(assignment.files.faculty);
              for (const key in ex[0].files.faculty) {
                ctx.setFacultyFile((prevState) => {
                  return {
                    ...prevState,
                    url: ex[0].files.faculty[key].url,
                    name: ex[0].files.faculty[key].name,
                  };
                });
                // ctx.setUrl(assignment.files.faculty[key]);
              }
            } else {
              ctx.setFacultyFile((prevState) => {
                return {
                  ...prevState,
                  url: false,
                  name: false,
                };
              });
            }
            ctx.setDataSubject(currentSubject);
            ctx.setDataSubjects(subjects);
            // ctx.setDataBranch(branches.find((o) => o.name === params.branch));
            // ctx.setBranches(branches);
            resolve(true);
          })
          .catch((err) => {
            if (err.name === "AbortError") {
            } else {
              // setError(err);
              console.log(err);
            }
          });
      });
    };
    //   const bb = () => {
    //     fetch(
    //       `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements.json`
    //     )
    //       .then((response) => {
    //         return response.json();
    //       })
    //       .then((data) => {
    //         const allAnnouncements = [];
    //         for (const key in data) {
    //           allAnnouncements.push({
    //             id: key,
    //             organisation: data[key].organisation,
    //             role: data[key].role,
    //             subject: data[key].subject,
    //             text: data[key].text,
    //             //   subjects: data[key].subjects,
    //           });
    //         }
    //         console.log(allAnnouncements, "kk");
    //         console.log(
    //           allAnnouncements.filter((obj) => {
    //             return (
    //               obj.organisation === localStorage.getItem("organisation") &&
    //               obj.role === 1
    //             );
    //           })
    //         );
    //         setAllAnnouncements((prevState) => {
    //           return {
    //             ...prevState,
    //             mineAnnouncements: allAnnouncements.filter((obj) => {
    //               return (
    //                 obj.organisation === localStorage.getItem("organisation") &&
    //                 obj.role === 1
    //               );
    //             }),
    //           };
    //         });
    //         setAllAnnouncements((prevState) => {
    //           return {
    //             ...prevState,
    //             teacherAnnouncements: allAnnouncements.filter((obj) => {
    //               return (
    //                 obj.organisation === localStorage.getItem("organisation") &&
    //                 obj.role === 2 &&
    //                 obj.subject === params.subjectname.trim()
    //               );
    //             }),
    //           };
    //         });
    //         setSpinnerShow(false);
    //         // setAnnouncementSpinner(false);
    //       });
    //   };
    const call = async () => {
      await aa();
      // bb();
    };
    call();
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (ctx.dataAssignment && ctx.dataSubject) {
      return;
    }
    if (
      localStorage.getItem("loggedIn") === "hod21" ||
      localStorage.getItem("loggedIn") === "guest"
    ) {
      fetchData(signal);
    } else {
      history.push("/");
    }

    return () => controller.abort();
  }, []);

  const openFileFaculty = () => {
    window.open(ctx.facultyFile.url);
  };

  return (
    <>
      {ctx.dataAssignment && ctx.dataAssignments && ctx.dataSubject ? (
        <>
          <TopNavbar />
          <div className="container" style={{ paddingTop: 30 }}>
            <div className="row justify-content-start gy-5">
              <div className="col-1">
                <MdOutlineAssignment
                  style={{ fontSize: 25, color: "#1266F1", marginTop: 15 }}
                />
              </div>
              <div className="col-11">
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <p className="headingTopic">{ctx.dataAssignment.title}</p>
                  </div>
                </div>
                <div className="row">
                  <p className="paraTopic">{ctx.dataSubject.faculty.name}</p>
                </div>
                <div className="row justify-content-between paraTopicBold">
                  <div className="col-auto">
                    {ctx.dataAssignment.totalMarks} points
                  </div>
                  <div className="col-auto">
                    Due date: {ctx.dataAssignment.dueDate}
                  </div>
                </div>
                <div className="row" style={{ marginTop: 10 }}>
                  <hr style={{ height: 3, color: "#01139F" }} />
                </div>
                <div className="row subheadingTopic">
                  <p>{ctx.dataAssignment.description}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-1"></div>
              <div className="col-11">
                <div className="row">
                  <div className="col-md-12 shadow p-3 mb-5 bg-body rounded">
                    <div className="row " style={{ paddingBottom: 40 }}>
                      <div className="col-auto boldFontSubHeading text-dark">
                        <h3>
                          <span
                            className="badge"
                            style={{ backgroundColor: "#BB0000" }}
                          >
                            Statistics
                          </span>
                        </h3>
                      </div>
                    </div>
                    <div
                      className="row justify-content-center"
                      style={{ paddingBottom: 40 }}
                    >
                      <BarChart />
                    </div>
                  </div>
                  <div className="col-md-12">
                    {ctx.facultyFile.url ? (
                      <>
                        <div className="card">
                          <div className="card-body">
                            <div className="row boldFontSubHeading">
                              <p>Faculty attachment</p>
                            </div>

                            <div
                              className="col-md-4 alert alert-white border-primary"
                              role="alert"
                            >
                              <div className="row">
                                <div className="col-auto">
                                  <AiOutlineFile style={{ fontSize: 15 }} />
                                  <button
                                    type="button"
                                    className="btn paraTopic btn-link text-primary text-break"
                                    onClick={openFileFaculty}
                                  >
                                    {ctx.facultyFile.name}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              <TopNavbar />
              <div className="row  justify-content-center">
                <Spinner />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
