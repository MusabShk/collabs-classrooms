import { useState, useEffect, useContext, useRef } from "react";
import {
  BrowserRouter,
  useHistory,
  Redirect,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import AuthUser from "../../store/auth-context";
import TopNavbar from "../navbar/Navbar";
import Loader from "../loader/Loader";
import Spinner from "../spinner/Spinner";
import CardWithImage from "../card/CardWithImage";
import { FaLessThanEqual, FaUserCircle } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { BsReverseLayoutSidebarReverse } from "react-icons/bs";
// import Accordion from "../accordion/Accordion";
import Announcements from "./Announcements";
import CardAssignment from "../card/CardAssignment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardBody = () => {
  const [sig, setSig] = useState();
  // console.log(window.location.pathname);
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    totalMarks: "",
    files: {
      faculty: false,
      students: false,
    },
  });
  const [assignmentsData, setAssignmentsData] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [allAnnouncements, setAllAnnouncements] = useState({
    hodAnnouncements: [],
    mineAnnouncements: [],
  });
  const [announcementSpinner, setAnnouncementSpinner] = useState(false);
  const [announcement, setAnnouncement] = useState({
    role: 2,
    text: "",
    organisation: localStorage.getItem("organisation"),
    subject: "",
    branch: localStorage.getItem("branch"),
  });

  const [showSpin, setShowSpin] = useState(false);
  const closeNewAssignmentModal = useRef();
  const cancel = useRef();
  const closeAnnouncement = useRef();
  const openNewAssignmentModal = useRef();

  const params = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [spinnerShow, setSpinnerShow] = useState(true);
  const ctx = useContext(AuthUser);
  const [subjectData, setSubjectData] = useState();
  const assignmentFieldChangeHandler = (event) => {
    setAssignment((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };
  const newAssignmentSubmitHandler = (event) => {
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
    setShowSpin(true);
    // console.log(assignment, "lo");
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects/${ctx.dataSubject.id}/assignments.json`,
      {
        signal: sig,
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignment),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        closeNewAssignmentModal.current.click();

        setShowSpin(false);

        // fetchData();
        ctx.setRefresh(!ctx.refresh);
        setShowSpin(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          console.log(err);
          // setError(err);
        }
      });
  };

  const [showremove, setShowremove] = useState(false);
  const studentTemplate = {
    name: "",
    email: "",
    password: "",
    rollnumber: "",
    passwordType: "password",
    role: 3,
    organisation: localStorage.getItem("organisation"),
    branch: localStorage.getItem("branch"),
  };
  const textChangeHandler = (event) => {
    setAnnouncement((prevState) => {
      return {
        ...prevState,
        text: event.target.value,
        subject: ctx.dataSubject.name,
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
  const [students, setStudents] = useState([studentTemplate]);
  const handleAddBranch = (event) => {
    event.preventDefault();
    const studentTemplate = {
      name: "",
      email: "",
      password: "",
      rollnumber: "",
      passwordType: "password",
      role: 3,
      organisation: localStorage.getItem("organisation"),
      branch: localStorage.getItem("branch"),
    };
    setStudents((prevState) => [...prevState, studentTemplate]);
    setShowremove(true);
  };

  const changeHandler = (index, event) => {
    event.preventDefault();
    event.persist();

    setStudents((prevState) => {
      return prevState.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      });
    });
  };

  const handleRemoveField = (e, index) => {
    e.preventDefault();
    // if (count === 1) {
    //   setShowSubmit(false);
    // }
    setStudents((prevState) =>
      prevState.filter((item) => item !== prevState[index])
    );
    var count = 0;
    for (var key in students) {
      // console.log(count, "count");
      // console.log(branches, "branches");
      count++;
    }

    if (count === 2) {
      setShowremove(false);
    }
  };

  const sub = (event) => {
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
    setShowSpin(true);
    let count = 0;
    const two = () => {
      students.forEach((e) => {
        count++;
        delete e.passwordType;
      });
    };
    // setSpinnerShow(true);
    // cancel.current.click();

    // console.log(students);
    // cancel.current.click();
    // setShowSpin(false);
    // ctx.setRefresh(!ctx.refresh);
    // console.log(students, "suuu");
    const three = () => {
      let i = 0;
      return new Promise((resolve, reject) => {
        students.map((student, index) => {
          fetch(
            `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/students.json`,
            {
              signal: sig,
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(student),
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              i++;
              if (i === count) {
                resolve(true);
              }
            })
            .catch((err) => {
              if (err.name === "AbortError") {
              } else {
                console.log(err);
                // setError(err);
              }
            });
        });
      });
    };

    const threee = () => {
      let j = 0;
      return new Promise((resolve, reject) => {
        students.map((student, index) => {
          fetch(
            `https://crm-management-6790c-default-rtdb.firebaseio.com/users.json`,
            {
              signal: sig,
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(student),
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              j++;
              if (j === count) {
                resolve(true);
              }
            })
            .catch((err) => {
              if (err.name === "AbortError") {
              } else {
                console.log(err);
                // setError(err);
              }
            });
        });
      });
    };

    const four = () => {
      cancel.current.click();
      // fetchData();
      ctx.setRefresh(!ctx.refresh);
      setShowSpin(false);
    };

    const call = async () => {
      two();
      await three();
      await threee();
      four();
    };
    call();
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setSig(signal);
    // setLoading(true);
    if (
      localStorage.getItem("loggedIn") === "78tech" ||
      localStorage.getItem("loggedIn") === "guest"
    ) {
      setLoading(false);

      setSpinnerShow(true);
      fetchData(signal);
    } else {
      history.push("/");
    }
    return () => controller.abort();
  }, [ctx.refresh]);
  // console.log(subjectData.name, "kk");
  const newFetchForAnnouncements = () => {
    // console.log(currentUser.subject);
    // setAnnouncementSpinner(true);
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
            hodAnnouncements: allAnnouncements.filter((obj) => {
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
            mineAnnouncements: allAnnouncements.filter((obj) => {
              return (
                obj.organisation === localStorage.getItem("organisation") &&
                obj.role === 2 &&
                obj.subject === currentUser.subject
              );
            }),
          };
        });
        setAnnouncementSpinner(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          console.log(err);
          // setError(err);
        }
      });
  };

  const toggle = (index, event) => {
    if (event.target.checked) {
      setStudents((prevState) => {
        return prevState.map((item, i) => {
          if (i !== index) {
            return item;
          }

          return {
            ...item,

            [event.target.name]: "text",
          };
        });
      });
    } else {
      setStudents((prevState) => {
        return prevState.map((item, i) => {
          if (i !== index) {
            return item;
          }

          return {
            ...item,

            [event.target.name]: "password",
          };
        });
      });
    }
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
          role: 2,
          text: "",
          organisation: localStorage.getItem("organisation"),
          subject: "",
          branch: localStorage.getItem("branch"),
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
                hodAnnouncements: allAnnouncements.filter((obj) => {
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
                mineAnnouncements: allAnnouncements.filter((obj) => {
                  return (
                    obj.organisation === localStorage.getItem("organisation") &&
                    obj.role === 2 &&
                    obj.subject === currentUser.subject
                  );
                }),
              };
            });
            setAnnouncementSpinner(false);
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
  };

  const fetchData = (signal) => {
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
    const allAnnouncements = [];

    const ttt = () => {
      fetch(
        `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements.json`,
        { signal: signal }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
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
              hodAnnouncements: allAnnouncements.filter((obj) => {
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
              mineAnnouncements: allAnnouncements.filter((obj) => {
                return (
                  obj.organisation === localStorage.getItem("organisation") &&
                  obj.role === 2 &&
                  obj.subject === user.subject
                );
              }),
            };
          });
          setAnnouncementSpinner(false);
          setSpinnerShow(false);
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

    const ooo = () => {
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
          // localStorage.setItem("branchname", dataBranch.name);
          for (const key in dataBranch.students) {
            students.push({
              id: key,
              ...dataBranch.students[key],
            });
          }
          ctx.setDataStudents(students);
          for (const key in dataBranch.subjects) {
            subjects.push({
              id: key,
              ...dataBranch.subjects[key],
            });
          }
          currentSubject = subjects.filter((obj) => {
            return obj.name === user.subject;
          });
          for (const key in currentSubject[0].assignments) {
            assignments.push({
              id: key,
              ...currentSubject[0].assignments[key],
            });
          }
          // setAssignmentsData(assignments);
          ctx.setDataAssignments(assignments);

          // setSubjectData(...currentSubject);
          ctx.setDataSubject(...currentSubject);
          ctx.setDataSubjects(subjects);
          // ctx.setDataBranch(branches.find((o) => o.name === user.branch));
          ttt();
          // resolve();
          //   ctx.setBranches(branches);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          } else {
            console.log(err);
            // setError(err);
          }
        });
    };
    // const one = () => {
    //   setSpinnerShow(true);
    // };

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
            announcements: data[key].announcements,
            branch: data[key].branch,
            subject: data[key].subject,
          });
        }
        user = users.find(
          (x) => x.name === localStorage.getItem("crmUserName")
        );
        setCurrentUser(user);
        ctx.setUserData(user);
        ooo();
        // resolve();
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          console.log(err);
          // setError(err);
        }
      });

    // const two = () => {
    //   return new Promise((resolve, reject) => {});
    // };

    // const three = () => {
    //   return new Promise((resolve, reject) => {

    //   });
    // };

    // const four = () => {
    //   return new Promise((resolve, reject) => {

    //       );
    //   });
    // };
    // const five = () => {
    //   console.log("4");
    // };

    // const call = async () => {
    //   //  one();
    //   two();
    //   await three();
    //   await four();
    //   await five();
    // };
    // call();
  };

  const closeAddStudentsModalHandler = () => {
    setStudents([studentTemplate]);
  };

  const closeCreateAssignmentModalHandler = () => {
    setAssignment({
      title: "",
      description: "",
      dueDate: "",
      totalMarks: "",
    });
  };
  // console.log(ctx.dataBranch, "lk");
  return (
    <div>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavbar />
          {spinnerShow ? (
            <>
              <div className="row  justify-content-center">
                <Spinner />
              </div>
            </>
          ) : (
            <>
              <div className="container" style={{ paddingTop: 30 }}>
                <div className="row justify-content-center">
                  <CardWithImage
                    subjectName={ctx.dataSubject.name}
                    orgName={ctx.dataOrganisation.name}
                  />
                </div>
                <div
                  className="row justify-content-center"
                  style={{ paddingTop: 30 }}
                >
                  <div className="col-md-8 shadow p-3 mb-5 bg-body rounded">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="row">
                          <div className="card  border-white ">
                            <div className="card">
                              <div className="card-body subheadingTopic">
                                <a
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  Add Students{" "}
                                  <TiPlus
                                    style={{ fontSize: 20, marginRight: 5 }}
                                  />
                                </a>
                                <div
                                  className="modal fade"
                                  id="exampleModal"
                                  data-bs-backdrop="static"
                                  data-bs-keyboard="false"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title subheadingTopic"
                                          id="exampleModalLabel"
                                        >
                                          Invite Students&nbsp;&nbsp;
                                        </h5>

                                        <button
                                          ref={cancel}
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                          onClick={closeAddStudentsModalHandler}
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <div className="row justify-content-center">
                                          <div className="col-md-10 ">
                                            <div className="row">
                                              <div className="card border-white">
                                                <div className="card-body text-dark">
                                                  {/* <div className="form-text ">
                                            Please fill in the below details :
                                          </div> */}
                                                  <span className="card-text">
                                                    <form onSubmit={sub}>
                                                      {students.map(
                                                        (item, index) => (
                                                          <div
                                                            key={`item-${index}`}
                                                          >
                                                            <div className="mb-3">
                                                              <label className="form-label paraTopic">
                                                                Student Name:
                                                              </label>
                                                              <input
                                                                type="text"
                                                                className="form-control paraTopic"
                                                                required
                                                                name="name"
                                                                value={
                                                                  item.name
                                                                }
                                                                onChange={(e) =>
                                                                  changeHandler(
                                                                    index,
                                                                    e
                                                                  )
                                                                }
                                                              />
                                                            </div>
                                                            <div className="mb-3">
                                                              <label className="form-label paraTopic">
                                                                Student Roll
                                                                Number:
                                                              </label>
                                                              <input
                                                                type="number"
                                                                className="form-control paraTopic"
                                                                required
                                                                name="rollnumber"
                                                                value={
                                                                  item.rollnumber
                                                                }
                                                                onChange={(e) =>
                                                                  changeHandler(
                                                                    index,
                                                                    e
                                                                  )
                                                                }
                                                              />
                                                            </div>
                                                            <div className="mb-3">
                                                              <div className="row g-2">
                                                                <div className="col-6">
                                                                  <label className="form-label paraTopic">
                                                                    Student
                                                                    Email:
                                                                  </label>
                                                                  <input
                                                                    type="email"
                                                                    className="form-control paraTopic"
                                                                    required
                                                                    name="email"
                                                                    value={
                                                                      item.email
                                                                    }
                                                                    onChange={(
                                                                      e
                                                                    ) =>
                                                                      changeHandler(
                                                                        index,
                                                                        e
                                                                      )
                                                                    }
                                                                  />
                                                                </div>
                                                                <div className="col-6">
                                                                  <label className="form-label paraTopic">
                                                                    Student
                                                                    Password:
                                                                  </label>
                                                                  <input
                                                                    type={
                                                                      item.passwordType
                                                                    }
                                                                    className="form-control paraTopic"
                                                                    required
                                                                    name="password"
                                                                    value={
                                                                      item.password
                                                                    }
                                                                    onChange={(
                                                                      e
                                                                    ) =>
                                                                      changeHandler(
                                                                        index,
                                                                        e
                                                                      )
                                                                    }
                                                                  />
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div className="mb-3 form-check ">
                                                              <input
                                                                onClick={(e) =>
                                                                  toggle(
                                                                    index,
                                                                    e
                                                                  )
                                                                }
                                                                // onClick={}
                                                                type="checkbox"
                                                                className="form-check-input "
                                                                id="flexCheckDefault"
                                                                name="passwordType"
                                                              />
                                                              <label className="form-check-label paraTopic">
                                                                Show password
                                                              </label>
                                                            </div>
                                                            {/* {showSpin ? (
                                                              <div className=" p-3 row justify-content-center">
                                                                <Spinner />
                                                              </div>
                                                            ) : (
                                                              <></>
                                                            )} */}

                                                            <div className="mb-3 d-grid gap-2">
                                                              {showremove ? (
                                                                <button
                                                                  className="btn btn-warning"
                                                                  onClick={(
                                                                    e
                                                                  ) => {
                                                                    handleRemoveField(
                                                                      e,
                                                                      index
                                                                    );
                                                                  }}
                                                                >
                                                                  Remove Student
                                                                </button>
                                                              ) : (
                                                                <></>
                                                              )}
                                                            </div>
                                                          </div>
                                                        )
                                                      )}
                                                      {showSpin ? (
                                                        <div className="p-3 row justify-content-center">
                                                          <Spinner />
                                                        </div>
                                                      ) : (
                                                        <div className="mb-3">
                                                          <div className="row g-2">
                                                            <div className="col-6 d-grid gap-2">
                                                              <button
                                                                className="btn btn-primary"
                                                                onClick={
                                                                  handleAddBranch
                                                                }
                                                                style={{
                                                                  borderColor:
                                                                    "darkblue",
                                                                  backgroundColor:
                                                                    "white",
                                                                  color:
                                                                    "darkblue",
                                                                }}
                                                              >
                                                                Add Student
                                                              </button>
                                                            </div>
                                                            <div className="col-6 d-grid gap-2">
                                                              <button
                                                                className="btn  text-white border-white"
                                                                type="submit"
                                                                style={{
                                                                  backgroundColor:
                                                                    "darkblue",
                                                                }}
                                                              >
                                                                Submit
                                                              </button>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      )}
                                                    </form>
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {ctx.dataStudents.length !== 0 ? (
                                <div className="d-grid">
                                  <button
                                    className="btn text-white "
                                    style={{
                                      backgroundColor: "darkblue",
                                    }}
                                    onClick={() =>
                                      history.push(
                                        `/${localStorage.getItem(
                                          "organisation"
                                        )}/teacher/students`
                                      )
                                    }
                                  >
                                    View Students
                                  </button>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
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
                              <div className="row justify-content-end">
                                <div className="col-auto">
                                  <a
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal1"
                                    ref={openNewAssignmentModal}
                                  >
                                    <TiPlus
                                      style={{ fontSize: 20, marginBottom: 20 }}
                                    />
                                  </a>
                                </div>
                              </div>

                              {/* <button
                                  type="button"
                                  className="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal1"
                                >
                                  Launch demo modal
                                </button> */}

                              <div
                                className="modal fade"
                                id="exampleModal1"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel1"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog modal-fullscreen">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title subheadingTopic"
                                        id="exampleModalLabel1"
                                      >
                                        Create Assignment
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        ref={closeNewAssignmentModal}
                                        onClick={
                                          closeCreateAssignmentModalHandler
                                        }
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      <div className="row justify-content-center">
                                        <div className="col-md-4 ">
                                          <div className="row">
                                            <div className="card border-secondary ">
                                              <div className="card-body text-dark">
                                                <div className="form-text ">
                                                  Organisation :{" "}
                                                  {localStorage.getItem(
                                                    "organisation"
                                                  )}
                                                </div>
                                                <h5 className="card-title boldFontSubHeading">
                                                  <FaUserCircle
                                                    style={{
                                                      fontSize: 30,
                                                      margin: 10,
                                                    }}
                                                  />
                                                  {localStorage.getItem(
                                                    "crmUserName"
                                                  )}
                                                </h5>
                                                <p className="card-text"></p>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="row"
                                            style={{ paddingTop: 30 }}
                                          >
                                            <div className="card border-secondary">
                                              <div className="card-body text-dark">
                                                <div className="form-text ">
                                                  Please fill in the below
                                                  details :
                                                </div>
                                                <div
                                                  className="mb-0"
                                                  style={{ paddingTop: 20 }}
                                                >
                                                  <label className="boldFontSubHeading">
                                                    Assignment Details
                                                  </label>
                                                </div>
                                                <span className="card-text">
                                                  <form
                                                    // style={{ paddingTop: 10 }}
                                                    onSubmit={
                                                      newAssignmentSubmitHandler
                                                    }
                                                  >
                                                    <div className="mb-3">
                                                      <label className="paraTopic">
                                                        Title:
                                                      </label>
                                                      <input
                                                        required
                                                        type="text"
                                                        className="form-control paraTopic"
                                                        name="title"
                                                        value={assignment.title}
                                                        onChange={
                                                          assignmentFieldChangeHandler
                                                        }
                                                        // value={subject}
                                                        // onChange={
                                                        //   subjectChangeHandler
                                                        // }
                                                      />
                                                    </div>

                                                    <div className="mb-3">
                                                      <label className="paraTopic">
                                                        Description:
                                                      </label>
                                                      <textarea
                                                        required
                                                        type="text"
                                                        className="form-control paraTopic"
                                                        name="description"
                                                        value={
                                                          assignment.description
                                                        }
                                                        onChange={
                                                          assignmentFieldChangeHandler
                                                        }
                                                        // value={faculty.name}
                                                        // onChange={
                                                        //   nameChangeHandler
                                                        // }
                                                      />
                                                    </div>
                                                    <div className="mb-3">
                                                      <div className="row g-2">
                                                        <div className="col-6">
                                                          <label className="paraTopic">
                                                            Due Date:
                                                          </label>
                                                          <input
                                                            required
                                                            type="date"
                                                            className="form-control paraTopic"
                                                            name="dueDate"
                                                            value={
                                                              assignment.dueDate
                                                            }
                                                            onChange={
                                                              assignmentFieldChangeHandler
                                                            }
                                                            // value={
                                                            //   faculty.email
                                                            // }
                                                            // onChange={
                                                            //   emailChangeHandler
                                                            // }
                                                          />
                                                        </div>
                                                        <div className="col-6">
                                                          <label className="paraTopic">
                                                            Total Marks:
                                                          </label>
                                                          <input
                                                            required
                                                            type="number"
                                                            className="form-control paraTopic"
                                                            name="totalMarks"
                                                            value={
                                                              assignment.totalMarks
                                                            }
                                                            onChange={
                                                              assignmentFieldChangeHandler
                                                            }
                                                            // value={
                                                            //   faculty.password
                                                            // }
                                                            // onChange={
                                                            //   passwordChangeHandler
                                                            // }
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                    {/* <div className="mb-3 form-check">
                                                      <input
                                                        onClick={toggle}
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="exampleCheck1"
                                                      />
                                                      <label
                                                        className="form-check-label"
                                                        htmlFor="exampleCheck1"
                                                      >
                                                        Show password
                                                      </label>
                                                    </div> */}
                                                    {showSpin ? (
                                                      <div className=" p-3 row justify-content-center">
                                                        <Spinner />
                                                      </div>
                                                    ) : (
                                                      <div className="d-grid">
                                                        <button
                                                          type="submit"
                                                          style={{
                                                            backgroundColor:
                                                              "darkblue",
                                                          }}
                                                          className="btn  text-white border-white "
                                                        >
                                                          Submit
                                                        </button>
                                                      </div>
                                                    )}
                                                  </form>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {ctx.dataAssignments.length !== 0 ? (
                                <CardAssignment />
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
                                  <div
                                    className="paraTopic text-center"
                                    style={{ paddingTop: 10 }}
                                  >
                                    <p>
                                      You can
                                      <span
                                        className="text-primary"
                                        onClick={() => {
                                          openNewAssignmentModal.current.click();
                                        }}
                                      >
                                        {" "}
                                        Create Assignments{" "}
                                      </span>
                                      by clicking the Plus icon on the left
                                      corner of block window.
                                    </p>
                                  </div>
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

export default DashboardBody;
