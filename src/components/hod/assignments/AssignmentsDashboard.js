import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../spinner/Spinner";
import Loader from "../../loader/Loader";
import TopNavbar from "../../navbar/Navbar";
import {
  BrowserRouter,
  useHistory,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AuthUser from "../../../store/auth-context";
import CardWithImage from "../../card/CardWithImage";
import { FaRestroom, FaUserCircle } from "react-icons/fa";
import Announcements from "./Announcements";
import CardAssignmentHod from "../../card/CardAssignmentHod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignmentsDashboard = () => {
  const closeAnnouncement = useRef();

  const [announcement, setAnnouncement] = useState({
    role: 1,
    text: "",
    organisation: localStorage.getItem("organisation"),
  });
  const [allAnnouncements, setAllAnnouncements] = useState({
    mineAnnouncements: [],
    teacherAnnouncements: [],
  });
  const [announcementSpinner, setAnnouncementSpinner] = useState(false);
  const params = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [spinnerShow, setSpinnerShow] = useState(false);
  const ctx = useContext(AuthUser);
  const [branchData, setBranchData] = useState();
  // const [subjectData, setSubjectData] = useState({
  //   id: "",
  //   data: {},
  // });

  const textChangeHandler = (event) => {
    setAnnouncement((prevState) => {
      return {
        ...prevState,
        text: event.target.value,
      };
    });
  };
  const cancelAnnouncementHandler = (event) => {
    event.preventDefault();
    setAnnouncement((prevState) => {
      return { ...prevState, text: "" };
    });
    closeAnnouncement.current.click();
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (localStorage.getItem("loggedIn") === "guest") {
      return toast.warn("Guest users do not have such action rights", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // console.log(currentUser.subject);

    closeAnnouncement.current.click();

    setAnnouncementSpinner(true);
    // console.log(announcement);
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements.json`,
      {
        signal: sig,
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(announcement),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAnnouncement({
          role: 1,
          text: "",
          organisation: localStorage.getItem("organisation"),
        });
        fetch(
          `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements.json`,
          { signal: sig }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const allAnnouncements = [];
            for (const key in data) {
              allAnnouncements.push({
                id: key,
                organisation: data[key].organisation,
                role: data[key].role,
                subject: data[key].subject,
                text: data[key].text,
                //   subjects: data[key].subjects,
              });
            }

            setAllAnnouncements((prevState) => {
              return {
                ...prevState,
                mineAnnouncements: allAnnouncements.filter((obj) => {
                  return (
                    obj.organisation === localStorage.getItem("organisation") &&
                    obj.role === 1
                  );
                }),
              };
            });
            setAllAnnouncements((prevState) => {
              return {
                ...prevState,
                teacherAnnouncements: allAnnouncements.filter((obj) => {
                  return (
                    obj.organisation === localStorage.getItem("organisation") &&
                    obj.role === 2 &&
                    obj.subject === params.subjectname.trim()
                  );
                }),
              };
            });
            setAnnouncementSpinner(false);
          })
          .catch((err) => {
            if (err.name === "AbortError") {
            } else {
              // setError(err);
              console.log(err);
            }
          });
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          // setError(err);
          console.log(err);
        }
      });
  };

  const newFetchForAnnouncements = () => {
    // console.log(currentUser.subject);
    setAnnouncementSpinner(true);
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements.json`,
      { signal: sig }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const allAnnouncements = [];
        for (const key in data) {
          allAnnouncements.push({
            id: key,
            organisation: data[key].organisation,
            role: data[key].role,
            subject: data[key].subject,
            text: data[key].text,
            //   subjects: data[key].subjects,
          });
        }
        // allAnnouncements.filter((obj) => {
        //   return (
        //     obj.organisation === localStorage.getItem("organisation") &&
        //     obj.role === 1
        //   );
        // });
        setAllAnnouncements((prevState) => {
          return {
            ...prevState,
            mineAnnouncements: allAnnouncements.filter((obj) => {
              return (
                obj.organisation === localStorage.getItem("organisation") &&
                obj.role === 1
              );
            }),
          };
        });
        setAllAnnouncements((prevState) => {
          return {
            ...prevState,
            teacherAnnouncements: allAnnouncements.filter((obj) => {
              return (
                obj.organisation === localStorage.getItem("organisation") &&
                obj.role === 2 &&
                obj.subject === params.subjectname.trim()
              );
            }),
          };
        });
        setAnnouncementSpinner(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          // setError(err);
          console.log(err);
        }
      });
  };

  const [sig, setSig] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setSig(signal);
    if (
      localStorage.getItem("loggedIn") === "hod21" ||
      localStorage.getItem("loggedIn") === "guest"
    ) {
      setLoading(false);
      setSpinnerShow(true);
      const aa = () => {
        return new Promise((resolve, reject) => {
          if (ctx.dataSubjects) {
            var currentSubject = ctx.dataSubjects.find((obj) => {
              return obj.name === params.subjectname.trim();
            });
            // console.log(currentSubject, "op");
            const assignments = [];
            for (const key in currentSubject.assignments) {
              assignments.push({
                id: key,
                ...currentSubject.assignments[key],
              });
            }
            // setAssignmentsData(assignments);
            ctx.setDataAssignments(assignments);
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
            ctx.setDataSubject(currentSubject);
            // ctx.setDataSubjects(subjects);
            // ctx.setDataBranch(branches.find((o) => o.name === params.branch));
            // ctx.setBranches(branches);
            resolve(true);
          } else {
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
                ctx.setDataBranch(
                  branches.find((o) => o.name === params.branch)
                );
                ctx.setBranches(branches);
                let dataBranch = branches.find(
                  (o) => o.name === params.branch.trim()
                );
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
                // console.log(currentSubject, "op");
                const assignments = [];
                for (const key in currentSubject.assignments) {
                  assignments.push({
                    id: key,
                    ...currentSubject.assignments[key],
                  });
                }
                // setAssignmentsData(assignments);
                ctx.setDataAssignments(assignments);
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
          }
        });
      };
      const bb = () => {
        fetch(
          `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements.json`,
          { signal: signal }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const allAnnouncements = [];
            for (const key in data) {
              allAnnouncements.push({
                id: key,
                organisation: data[key].organisation,
                role: data[key].role,
                subject: data[key].subject,
                text: data[key].text,
                //   subjects: data[key].subjects,
              });
            }

            setAllAnnouncements((prevState) => {
              return {
                ...prevState,
                mineAnnouncements: allAnnouncements.filter((obj) => {
                  return (
                    obj.organisation === localStorage.getItem("organisation") &&
                    obj.role === 1
                  );
                }),
              };
            });
            setAllAnnouncements((prevState) => {
              return {
                ...prevState,
                teacherAnnouncements: allAnnouncements.filter((obj) => {
                  return (
                    obj.organisation === localStorage.getItem("organisation") &&
                    obj.role === 2 &&
                    obj.subject === params.subjectname.trim()
                  );
                }),
              };
            });
            setSpinnerShow(false);
            // setAnnouncementSpinner(false);
          })
          .catch((err) => {
            if (err.name === "AbortError") {
            } else {
              // setError(err);
              console.log(err);
            }
          });
      };
      const call = async () => {
        await aa();
        bb();
      };
      call();
    } else {
      history.push("/");
    }

    return () => controller.abort();
  }, []);
  // console.log(ctx.dataSubjects, "test22");
  // console.log(allAnnouncements, "lo");
  // console.log(allAnnouncements, "check1");
  // // console.log(subjectData, "test23");

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <>
          {spinnerShow ? (
            <>
              <TopNavbar />
              <div className="row  justify-content-center">
                <Spinner />
              </div>
            </>
          ) : (
            <>
              <TopNavbar />
              <div className="container" style={{ paddingTop: 30 }}>
                <div className="row justify-content-center">
                  <CardWithImage subjectName={ctx.dataSubject.name} />
                </div>
                <div
                  className="row justify-content-center"
                  style={{ paddingTop: 30 }}
                >
                  <div className="col-md-8 shadow p-3 mb-5 bg-body rounded">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="row">
                          <div
                            className="card  border-white "
                            style={{ paddingTop: 20, paddingBottom: 20 }}
                          >
                            {announcementSpinner ? (
                              <div className="row  justify-content-center">
                                <Spinner />
                              </div>
                            ) : (
                              <Announcements
                                allAnnouncements={allAnnouncements}
                                newFetchForAnnouncements={
                                  newFetchForAnnouncements
                                }
                                setAnnouncementSpinner={setAnnouncementSpinner}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="row">
                          <div className="card  border-white ">
                            <div className=" card-header border-white bg-white">
                              <div
                                className="accordion accordion-flush "
                                id="accordionFlushExample"
                              >
                                <div className="accordion-item ">
                                  <h2
                                    className="accordion-header"
                                    id="flush-headingOne"
                                  >
                                    <button
                                      className="accordion-button collapsed rounded-pill bg-light border border-3 border-primary paraTopic"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseOne"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                      ref={closeAnnouncement}
                                    >
                                      <FaUserCircle
                                        style={{
                                          fontSize: 30,
                                          marginRight: 10,
                                        }}
                                      />
                                      Announce something to your class
                                    </button>
                                  </h2>
                                  <div
                                    id="flush-collapseOne"
                                    className="accordion-collapse collapse "
                                    aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div className="accordion-body border-end border-start border-bottom ">
                                      <form onSubmit={submitHandler}>
                                        <div className="mb-3">
                                          <textarea
                                            required
                                            className="form-control paraTopic"
                                            id="exampleFormControlTextarea1"
                                            rows="3"
                                            onChange={textChangeHandler}
                                            value={announcement.text}
                                          />
                                        </div>

                                        <div className="row justify-content-start">
                                          <div className="col-auto">
                                            <button
                                              onClick={
                                                cancelAnnouncementHandler
                                              }
                                              className="btn btn-link paraTopic"
                                              style={{
                                                // borderColor: "darkblue",
                                                // backgroundColor: "white",
                                                color: "darkblue",
                                              }}
                                            >
                                              Cancel
                                            </button>
                                          </div>

                                          <div className="col-auto">
                                            <button
                                              type="submit"
                                              className="btn text-white border-white paraTopic"
                                              style={{
                                                backgroundColor: "darkblue",
                                              }}
                                            >
                                              Post
                                            </button>
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="card border-white">
                            <div className="card-body">
                              {ctx.dataAssignments.length !== 0 ? (
                                <CardAssignmentHod />
                              ) : (
                                <>
                                  <p className=" text-center">
                                    <img
                                      src="/assignment.png"
                                      className="card-img"
                                      alt="..."
                                      style={{ width: 250 }}
                                    />
                                  </p>
                                  <p className="text-center boldFontSubHeading ">
                                    No Assignments here !
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default AssignmentsDashboard;
