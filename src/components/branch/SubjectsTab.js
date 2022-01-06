import { RiBookMarkFill } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { BrowserRouter, useHistory, useParams } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiDeleteBin4Line } from "react-icons/ri";
import AuthUser from "../../store/auth-context";
import { useContext, useEffect, useState, useRef, useReducer } from "react";
import Spinner from "../spinner/Spinner";
import { TiPlus } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubjectsTab = () => {
  const [switchTextPassword, setSwitchTextPassword] = useState("password");
  const cancel = useRef();
  const addSubject = useRef();
  const [showSpin, setShowSpin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [faculty, setFaculty] = useState({
    name: "",
    email: "",
    password: "",
    announcements: false,
    role: 2,
    organisation: localStorage.getItem("organisation"),
    subject: "",
    branch: "",
  });
  const ctx = useContext(AuthUser);
  const history = useHistory();
  const params = useParams();
  const [sig, setSig] = useState();
  // console.log(props);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setSig(signal);

    return () => controller.abort();
  }, []);
  const cardClickHandler = (subject) => {
    history.push(
      `/${localStorage.getItem("organisation")}/hod/branch/${
        params.branch
      }/${subject}`
    );
  };
  // useEffect(() => {
  //   setLoading(true);
  //   fetch(
  //     `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch.json`
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data, "dt");
  //       const branches = [];
  //       for (const key in data) {
  //         branches.push({
  //           id: key,
  //           ...data[key],
  //         });
  //       }
  //       // ctx.setDataBranch(branches.find((o) => o.name === params.branch));
  //       // ctx.setBranches(branches);
  //       let dataBranch = branches.find((o) => o.name === params.branch);
  //       console.log(dataBranch, "datab");
  //       const subjects = [];
  //       for (const key in dataBranch.subjects) {
  //         subjects.push({
  //           id: key,
  //           ...dataBranch.subjects[key],
  //         });
  //       }
  //       ctx.setDataSubjects(subjects);
  //       ctx.setDataBranch(branches.find((o) => o.name === params.branch));
  //       setLoading(false);
  //       //   setAgain((prevState) => !prevState);
  //       //   // props.setRefresh();
  //       // });
  //     });
  // }, []);

  // const xxx = () => {
  //   fetch(
  //     `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects.json`
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data, "mek");
  //       const subjects = [];
  //       for (const key in data) {
  //         subjects.push({
  //           id: key,
  //           ...data[key],
  //         });
  //       }
  //       console.log(subjects, "mek2");
  //       ctx.setDataSubjects(subjects);
  //       setLoading(false);
  //     });
  // };
  const deleteSubjectHandler = (subjectId, name) => {
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
    setLoading(true);
    ctx.setMultiLoad(true);
    let lenght = ctx.dataSubjects.length;
    if (lenght === 1) {
      fetch(
        `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects.json`,
        {
          signal: sig,
          method: "PUT", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(false),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // ResetData(subjectId);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          } else {
            // setError(err);
            console.log(err);
          }
        });
    } else {
      fetch(
        `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects/${subjectId}.json`,
        { signal: sig, method: "DELETE" }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // ResetData(subjectId);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          } else {
            // setError(err);
            console.log(err);
          }
        });
    }
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/users.json`,
      { signal: sig }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const users = [];
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
        let user = users.find((x) => x.name === name);
        fetch(
          `https://crm-management-6790c-default-rtdb.firebaseio.com/users/${user.id}.json`,
          { signal: sig, method: "DELETE" }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            ctx.setRefresh(!ctx.refresh);
            setLoading(false);
            ctx.setMultiLoad(false);
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
    // ctx.setRefresh(!ctx.refresh);

    // props.setLoading(true);
    // console.log({ subjects: ctx.dataSubjects });
    // console.log(subjectId);
    // setLoading(true);
  };
  // console.log(ctx.refresh, "yeelo");

  const subjectChangeHandler = (event) => {
    setSubject(event.target.value);
    setFaculty((prevState) => {
      return { ...prevState, subject: event.target.value };
    });
  };

  const nameChangeHandler = (event) => {
    setFaculty((prevState) => {
      return { ...prevState, name: event.target.value };
    });
  };
  const emailChangeHandler = (event) => {
    setFaculty((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };
  const passwordChangeHandler = (event) => {
    setFaculty((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };

  const toggle = () => {
    if (switchTextPassword === "text") {
      setSwitchTextPassword("password");
    } else {
      setSwitchTextPassword("text");
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
    setShowSpin(true);

    let sub = {
      name: subject,
      faculty: {
        ...faculty,
        branch: params.branch,
      },
      assignments: false,
    };
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/users.json`,
      {
        signal: sig,
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sub.faculty),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {})
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          // setError(err);
          console.log(err);
        }
      });
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects.json`,
      {
        signal: sig,
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sub),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // setSubject("");
        // setFaculty({
        //   name: "",
        //   email: "",
        //   password: "",
        //   announcements: false,
        //   role: 2,
        //   organisation: localStorage.getItem("organisation"),
        //   subject: "",
        // });
        cancel.current.click();
        ctx.setRefresh(!ctx.refresh);
        setShowSpin(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          // setError(err);
          console.log(err);
        }
      });
    // console.log(sub);
    // console.log(faculty);
  };

  return (
    <>
      <ToastContainer />
      {loading && ctx.multiLoad ? (
        <div className="row  justify-content-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="row g-0">
            <div className="row justify-content-end">
              <div className="col-auto">
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  ref={addSubject}
                >
                  <TiPlus style={{ fontSize: 20 }} />
                </a>
              </div>
            </div>

            <div
              className="modal fade"
              id="exampleModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title subheadingTopic"
                      id="exampleModalLabel"
                    >
                      Create a Subject
                    </h5>
                    <button
                      onClick={() => {
                        setSubject("");
                        setFaculty({
                          name: "",
                          email: "",
                          password: "",
                          announcements: false,
                          role: 2,
                          organisation: localStorage.getItem("organisation"),
                          subject: "",
                        });
                      }}
                      ref={cancel}
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
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
                                {localStorage.getItem("organisation")}
                              </div>
                              <h5 className="card-title boldFontSubHeading">
                                <FaUserCircle
                                  style={{ fontSize: 30, margin: 10 }}
                                />
                                {localStorage.getItem("crmUserName")}
                              </h5>
                              <p className="card-text"></p>
                            </div>
                          </div>
                        </div>
                        <div className="row" style={{ paddingTop: 30 }}>
                          <div className="card border-secondary">
                            <div className="card-body text-dark">
                              <div className="form-text ">
                                Please fill in the below details :
                              </div>
                              <span className="card-text">
                                <form
                                  style={{ paddingTop: 20 }}
                                  onSubmit={submitHandler}
                                >
                                  <div className="mb-3">
                                    <label className="paraTopic">
                                      Subject Name
                                    </label>
                                    <input
                                      required
                                      type="text"
                                      className="form-control paraTopic"
                                      value={subject}
                                      onChange={subjectChangeHandler}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label className="boldFontSubHeading">
                                      Faculty details
                                    </label>
                                  </div>
                                  <div className="mb-3">
                                    <label className="paraTopic">
                                      Faculty Name
                                    </label>
                                    <input
                                      required
                                      type="text"
                                      className="form-control paraTopic"
                                      value={faculty.name}
                                      onChange={nameChangeHandler}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <div className="row g-2">
                                      <div className="col-6">
                                        <label className="paraTopic">
                                          Faculty Email
                                        </label>
                                        <input
                                          required
                                          type="email"
                                          className="form-control paraTopic"
                                          value={faculty.email}
                                          onChange={emailChangeHandler}
                                        />
                                      </div>
                                      <div className="col-6">
                                        <label className="paraTopic">
                                          Faculty password
                                        </label>
                                        <input
                                          required
                                          type={switchTextPassword}
                                          className="form-control paraTopic"
                                          value={faculty.password}
                                          onChange={passwordChangeHandler}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-3 form-check">
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
                                  </div>
                                  {showSpin ? (
                                    <div className=" p-3 row justify-content-center">
                                      <Spinner />
                                    </div>
                                  ) : (
                                    <div className=" d-grid">
                                      <button
                                        style={{
                                          backgroundColor: "darkblue",
                                        }}
                                        className="btn  text-white border-white"
                                        type="submit"
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
                  {/* <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Save changes
                        </button>
                      </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0">
            {ctx.dataSubjects ? (
              <>
                {ctx.dataSubjects.map((subject, index) => (
                  <div
                    className="card border-warning col-sm-3"
                    style={{ marginRight: 20, marginTop: 20 }}
                    key={index}
                  >
                    <div
                      className="card-header  border-warning "
                      style={{ backgroundColor: "#FFF69D" }}
                      onClick={() => {
                        cardClickHandler(subject.name);
                      }}
                    >
                      <div className="row justify-content-between">
                        <div className="col-auto ">
                          <h5 className="headingTopic">{subject.name}</h5>
                        </div>
                        <div className="col-auto ">
                          <RiBookMarkFill style={{ fontSize: 30 }} />
                        </div>
                      </div>

                      <p className="subheadingTopic" style={{ paddingTop: 10 }}>
                        {subject.faculty.name}
                      </p>
                    </div>
                    <div
                      className="card-body text-success"
                      onClick={() => {
                        cardClickHandler(subject.name);
                      }}
                    >
                      <h5 className="card-title">&nbsp; &nbsp;</h5>
                      {/* <p className="card-text">&nbsp; &nbsp;</p> */}
                    </div>
                    <div className="card-footer border-white bg-white">
                      <div className="row justify-content-end">
                        <div className="col-auto">
                          <BiDotsVerticalRounded
                            style={{ fontSize: 25 }}
                            data-bs-toggle="dropdown"
                          />
                          <ul className="dropdown-menu dropdown-menu-end ">
                            <li>
                              <button
                                className="dropdown-item"
                                type="button"
                                onClick={() =>
                                  deleteSubjectHandler(
                                    subject.id,
                                    subject.faculty.name
                                  )
                                }
                              >
                                <RiDeleteBin4Line style={{ fontSize: 20 }} />{" "}
                                &nbsp;Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}{" "}
              </>
            ) : (
              <>
                <div className="row justify-content-center">
                  <img
                    src="/nosubjects.png"
                    className="card-img"
                    alt="..."
                    style={{ width: 230 }}
                  />
                </div>
                <div className="row justify-content-center boldFontSubHeading ">
                  No Subjects here !
                </div>

                <div
                  className="row paraTopic text-center"
                  style={{ paddingTop: 20 }}
                >
                  <div>
                    You can
                    <span
                      className="text-primary"
                      onClick={() => {
                        addSubject.current.click();
                      }}
                    >
                      {" "}
                      Add Subjects{" "}
                    </span>
                    by clicking the Plus icon on the right corner of block
                    window.
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SubjectsTab;
