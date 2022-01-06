import { React, useEffect, useContext, useState } from "react";
import { MdDelete } from "react-icons/md";

import AuthUser from "../../../../../store/auth-context";
import TopNavbar from "../../../../navbar/Navbar";
import Spinner from "../../../../spinner/Spinner";
import { useParams, useHistory } from "react-router-dom";
import Loader from "../../../../loader/Loader";
import { MdOutlineAssignment } from "react-icons/md";
// import { storage } from "../../../firebase";
import { storage } from "../../../../../firebase";
// import { getDownloadURL } from "firebase/storage";
import { TiPlus } from "react-icons/ti";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { AiOutlineFile } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardAssignment = () => {
  const [loading, setLoading] = useState(true);
  const ctx = useContext(AuthUser);
  const params = useParams();
  const history = useHistory();

  // const loadData = async () => {
  //   const url = `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation.json`;
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   const perform = await doing(data);
  // };

  const fetchData = () => {
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation.json`
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
        let result = allOrg.find((obj) => {
          return obj.name === localStorage.getItem("organisation");
        });
        const branches = [];
        ctx.setDataOrganisation((prevState) => {
          return {
            ...prevState,
            id: result.id,
            ...result,
          };
        });
        for (const key in result.branches) {
          branches.push({
            id: key,
            ...result.branches[key],
          });
        }
        ctx.setDataBranch(
          branches.find((o) => o.name === localStorage.getItem("branch"))
        );
        ctx.setBranches(branches);
        let dataBranch = branches.find(
          (o) => o.name === localStorage.getItem("branch")
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
        const assignments = [];
        for (const key in currentSubject.assignments) {
          assignments.push({
            id: key,
            ...currentSubject.assignments[key],
          });
        }
        ctx.setDataAssignments(assignments);
        let ass = assignments.filter((obj) => {
          return obj.id === params.assignmentid;
        });

        let exass = ass[0];

        if (exass.files.faculty !== false) {
          for (const key in exass.files.faculty) {
            ctx.setFacultyFile((prevState) => {
              return {
                ...prevState,
                url: exass.files.faculty[key].url,
                name: exass.files.faculty[key].name,
              };
            });
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

        if (exass.files.students !== false) {
          let allAss = [];
          for (const key in exass.files.students) {
            allAss.push({
              id: key,
              name: exass.files.students[key].name,
              url: exass.files.students[key].url,
              rollnumber: exass.files.students[key].rollnumber,
              fileName: exass.files.students[key].fileName,
            });
          }
          let results = allAss.find((obj) => {
            return (
              obj.name === localStorage.getItem("crmUserName") &&
              obj.rollnumber === localStorage.getItem("rollnumber")
            );
          });
          if (results) {
            ctx.setStudentFiles((prevState) => {
              return {
                ...prevState,
                id: results.id,
                url: results.url,
                name: results.name,
                rollnumber: results.rollnumber,
                fileName: results.fileName,
                marks: results.marks,
              };
            });
          } else {
            ctx.setStudentFiles((prevState) => {
              return {
                ...prevState,
                id: false,
                url: false,
                name: false,
                rollnumber: false,
                fileName: false,
                marks: false,
              };
            });
          }
        } else {
          ctx.setStudentFiles((prevState) => {
            return {
              ...prevState,
              id: false,
              url: false,
              name: false,
              rollnumber: false,
              fileName: false,
              marks: false,
            };
          });
        }

        ctx.setDataSubject(currentSubject);
        ctx.setDataAssignment(ass[0]);
        setSpin(false);
      });
  };

  // const fetchData = () => {
  //   fetch(
  //     `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation.json`
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // console.log(result);
  //       // ctx.setWait(false);
  //       ////////
  //       // ctx.setDataBranch(branches.find((o) => o.name === params.branch));
  //       // ctx.setBranches(branches);
  //     });
  // };

  // useEffect(() => {
  //   const abortCont = new AbortController();
  //   if (localStorage.getItem("loggedIn") === "stud00") {
  //     setLoading(false);
  //     if (!ctx.dataAssignment) {

  //     }
  //   } else {
  //     history.push("/");
  //   }
  //   return () => {
  //     abortCont.abort();
  //   };
  // }, [refresh]);

  // useEffect(() => {
  //   if (ctx.wait === true) {

  //   }
  // }, [ctx.wait]);

  // const fetchData = () => {
  //   ctx.setWait(true);

  //   // setLoad(true);
  //   // console.log("hiii");

  //   //   const bb = () => {
  //   //     fetch(
  //   //       `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements.json`
  //   //     )
  //   //       .then((response) => {
  //   //         return response.json();
  //   //       })
  //   //       .then((data) => {
  //   //         const allAnnouncements = [];
  //   //         for (const key in data) {
  //   //           allAnnouncements.push({
  //   //             id: key,
  //   //             organisation: data[key].organisation,
  //   //             role: data[key].role,
  //   //             subject: data[key].subject,
  //   //             text: data[key].text,
  //   //             //   subjects: data[key].subjects,
  //   //           });
  //   //         }
  //   //         console.log(allAnnouncements, "kk");
  //   //         console.log(
  //   //           allAnnouncements.filter((obj) => {
  //   //             return (
  //   //               obj.organisation === localStorage.getItem("organisation") &&
  //   //               obj.role === 1
  //   //             );
  //   //           })
  //   //         );
  //   //         setAllAnnouncements((prevState) => {
  //   //           return {
  //   //             ...prevState,
  //   //             mineAnnouncements: allAnnouncements.filter((obj) => {
  //   //               return (
  //   //                 obj.organisation === localStorage.getItem("organisation") &&
  //   //                 obj.role === 1
  //   //               );
  //   //             }),
  //   //           };
  //   //         });
  //   //         setAllAnnouncements((prevState) => {
  //   //           return {
  //   //             ...prevState,
  //   //             teacherAnnouncements: allAnnouncements.filter((obj) => {
  //   //               return (
  //   //                 obj.organisation === localStorage.getItem("organisation") &&
  //   //                 obj.role === 2 &&
  //   //                 obj.subject === params.subjectname.trim()
  //   //               );
  //   //             }),
  //   //           };
  //   //         });
  //   //         setSpinnerShow(false);
  //   //         // setAnnouncementSpinner(false);
  //   //       });
  //   //   };

  //   // const call = async () => {
  //   //   await aa();
  //   //   // bb();
  //   // };
  //   // call();
  // };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (loading) {
      if (
        localStorage.getItem("loggedIn") === "stud00" ||
        localStorage.getItem("loggedIn") === "guest"
      ) {
        setLoading(false);
        if (!ctx.dataAssignment) {
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
              let result = allOrg.find((obj) => {
                return obj.name === localStorage.getItem("organisation");
              });
              const branches = [];
              ctx.setDataOrganisation((prevState) => {
                return {
                  ...prevState,
                  id: result.id,
                  ...result,
                };
              });
              for (const key in result.branches) {
                branches.push({
                  id: key,
                  ...result.branches[key],
                });
              }
              ctx.setDataBranch(
                branches.find((o) => o.name === localStorage.getItem("branch"))
              );
              ctx.setBranches(branches);
              let dataBranch = branches.find(
                (o) => o.name === localStorage.getItem("branch")
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
              const assignments = [];
              for (const key in currentSubject.assignments) {
                assignments.push({
                  id: key,
                  ...currentSubject.assignments[key],
                });
              }
              ctx.setDataAssignments(assignments);
              let ass = assignments.filter((obj) => {
                return obj.id === params.assignmentid;
              });

              let exass = ass[0];

              if (exass.files.faculty !== false) {
                for (const key in exass.files.faculty) {
                  ctx.setFacultyFile((prevState) => {
                    return {
                      ...prevState,
                      url: exass.files.faculty[key].url,
                      name: exass.files.faculty[key].name,
                    };
                  });
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

              if (exass.files.students !== false) {
                let allAss = [];
                for (const key in exass.files.students) {
                  allAss.push({
                    id: key,
                    name: exass.files.students[key].name,
                    url: exass.files.students[key].url,
                    rollnumber: exass.files.students[key].rollnumber,
                    fileName: exass.files.students[key].fileName,
                    marks: exass.files.students[key].marks,
                  });
                }
                let results = allAss.find((obj) => {
                  return (
                    obj.name === localStorage.getItem("crmUserName") &&
                    obj.rollnumber === localStorage.getItem("rollnumber")
                  );
                });
                if (results) {
                  ctx.setStudentFiles((prevState) => {
                    return {
                      ...prevState,
                      id: results.id,
                      url: results.url,
                      name: results.name,
                      rollnumber: results.rollnumber,
                      fileName: results.fileName,
                      marks: results.marks,
                    };
                  });
                } else {
                  ctx.setStudentFiles((prevState) => {
                    return {
                      ...prevState,
                      id: false,
                      url: false,
                      name: false,
                      rollnumber: false,
                      fileName: false,
                      marks: false,
                    };
                  });
                }
              } else {
                ctx.setStudentFiles((prevState) => {
                  return {
                    ...prevState,
                    id: false,
                    url: false,
                    name: false,
                    rollnumber: false,
                    fileName: false,
                    marks: false,
                  };
                });
              }

              ctx.setDataSubject(currentSubject);
              ctx.setDataAssignment(ass[0]);
              setSpin(false);
            })
            .catch((err) => {
              if (err.name === "AbortError") {
              } else {
                console.log(err);
                // setError(err);
              }
            });
        }
      } else {
        history.push("/");
      }
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
          let result = allOrg.find((obj) => {
            return obj.name === localStorage.getItem("organisation");
          });
          const branches = [];
          ctx.setDataOrganisation((prevState) => {
            return {
              ...prevState,
              id: result.id,
              ...result,
            };
          });
          for (const key in result.branches) {
            branches.push({
              id: key,
              ...result.branches[key],
            });
          }
          ctx.setDataBranch(
            branches.find((o) => o.name === localStorage.getItem("branch"))
          );
          ctx.setBranches(branches);
          let dataBranch = branches.find(
            (o) => o.name === localStorage.getItem("branch")
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
          const assignments = [];
          for (const key in currentSubject.assignments) {
            assignments.push({
              id: key,
              ...currentSubject.assignments[key],
            });
          }
          ctx.setDataAssignments(assignments);
          let ass = assignments.filter((obj) => {
            return obj.id === params.assignmentid;
          });

          let exass = ass[0];

          if (exass.files.faculty !== false) {
            for (const key in exass.files.faculty) {
              ctx.setFacultyFile((prevState) => {
                return {
                  ...prevState,
                  url: exass.files.faculty[key].url,
                  name: exass.files.faculty[key].name,
                };
              });
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

          if (exass.files.students !== false) {
            let allAss = [];
            for (const key in exass.files.students) {
              allAss.push({
                id: key,
                name: exass.files.students[key].name,
                url: exass.files.students[key].url,
                rollnumber: exass.files.students[key].rollnumber,
                fileName: exass.files.students[key].fileName,
                marks: exass.files.students[key].marks,
              });
            }
            let results = allAss.find((obj) => {
              return (
                obj.name === localStorage.getItem("crmUserName") &&
                obj.rollnumber === localStorage.getItem("rollnumber")
              );
            });
            if (results) {
              ctx.setStudentFiles((prevState) => {
                return {
                  ...prevState,
                  id: results.id,
                  url: results.url,
                  name: results.name,
                  rollnumber: results.rollnumber,
                  fileName: results.fileName,
                  marks: results.marks,
                };
              });
            } else {
              ctx.setStudentFiles((prevState) => {
                return {
                  ...prevState,
                  id: false,
                  url: false,
                  name: false,
                  rollnumber: false,
                  fileName: false,
                  marks: false,
                };
              });
            }
          } else {
            ctx.setStudentFiles((prevState) => {
              return {
                ...prevState,
                id: false,
                url: false,
                name: false,
                rollnumber: false,
                fileName: false,
                marks: false,
              };
            });
          }

          ctx.setDataSubject(currentSubject);
          ctx.setDataAssignment(ass[0]);
          setSpin(false);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          } else {
            // setError(err);
            console.log(err);
          }
        });
    }
    return () => controller.abort();
  }, [ctx.refresh]);

  // useEffect(() => {
  //   if (localStorage.getItem("loggedIn") === "stud00") {
  //     setLoading(false);
  //   } else {
  //     history.push("/");
  //   }
  // }, []);

  const [spin, setSpin] = useState(false);
  const [load, setLoad] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const [spinlast, setSpinlast] = useState(true);
  const formHandler = (event) => {
    event.preventDefault();
    setShowBar(true);
    const file = event.target[0].files[0];
    uploadFile(file);
  };

  const uploadFile = (file) => {
    if (!file) return;
    const storageRef = ref(
      storage,
      `/${localStorage.getItem("organisation")}/${localStorage.getItem(
        "branch"
      )}/${ctx.dataSubject.name}/${
        params.assignmentid
      }/students/${localStorage.getItem("rollnumber")}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          let fileInfo = {
            url: url,
            rollnumber: localStorage.getItem("rollnumber"),
            name: localStorage.getItem("crmUserName"),
            fileName: file.name,
            marks: "0",
          };
          fetch(
            `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects/${ctx.dataSubject.id}/assignments/${ctx.dataAssignment.id}/files/students.json`,
            {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(fileInfo),
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              // ctx.setUrl(url);
              setShowBar(false);
              setSpin(true);
              // loadData();
              // fetchData();
              ctx.setRefresh(!ctx.refresh);
            });
        });
      }
    );
  };

  const deleteFile = () => {
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
    let len = 0;
    setSpin(true);
    const desertRef = ref(
      storage,
      `/${localStorage.getItem("organisation")}/${localStorage.getItem(
        "branch"
      )}/${ctx.dataSubject.name}/${
        params.assignmentid
      }/students/${localStorage.getItem("rollnumber")}/${
        ctx.studentFiles.fileName
      }`
    );

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        fetch(
          `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects/${ctx.dataSubject.id}/assignments/${ctx.dataAssignment.id}/files/students.json`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            for (const key in data) {
              len++;
            }
            if (len === 1) {
              fetch(
                `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects/${ctx.dataSubject.id}/assignments/${ctx.dataAssignment.id}/files/students.json`,
                {
                  method: "PUT", // or 'PUT'
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: false,
                }
              )
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  // fetchData();
                  ctx.setRefresh(!ctx.refresh);
                });
            } else {
              fetch(
                `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects/${ctx.dataSubject.id}/assignments/${ctx.dataAssignment.id}/files/students/${ctx.studentFiles.id}.json`,
                {
                  method: "DELETE", // or 'PUT'
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  // fetchData();
                  ctx.setRefresh(!ctx.refresh);
                });
            }
          });

        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  const openFileFaculty = () => {
    window.open(ctx.facultyFile.url);
  };

  const openFileStudent = () => {
    window.open(ctx.studentFiles.url);
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavbar />
          {ctx.dataAssignment ? (
            <>
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
                        <p className="headingTopic">
                          {ctx.dataAssignment.title}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <p className="paraTopic">
                        {ctx.dataSubject.faculty.name}
                      </p>
                    </div>
                    <div className="row justify-content-between paraTopicBold">
                      <div className="col-auto">
                        {ctx.dataAssignment.totalMarks} points
                        &nbsp;&nbsp;&nbsp;
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
                  <div className="col-11 ">
                    <div className="row">
                      <div className="col-md-8 ms-auto">
                        <div className="card" style={{ marginBottom: 10 }}>
                          <div className="card-body">
                            {/* <div className="row">
<p className="boldFontSubHeading">Attachements:</p>
</div> */}
                            {ctx.dataAssignment.files.faculty === false ? (
                              <>
                                <div className="row ">
                                  <p className="boldFontSubHeading">
                                    Faculty Attachments
                                  </p>
                                </div>
                                <div className="row justify-content-center paraTopic">
                                  No attachments
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="row ">
                                  <p className="boldFontSubHeading">
                                    Faculty Attachments
                                  </p>
                                </div>
                                <div className="alert alert-white" role="alert">
                                  <div className="row justify-content-between">
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
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card" style={{ marginBottom: 10 }}>
                          <div className="card-body">
                            <div className="row" style={{ paddingBottom: 20 }}>
                              <div className="col-auto me-auto boldFontSubHeading">
                                Your Attachements
                              </div>
                              <div className="col-auto paraTopic">
                                {ctx.studentFiles.url ? (
                                  <>
                                    {ctx.studentFiles.marks ? (
                                      <>
                                        {ctx.studentFiles.marks}/
                                        {ctx.dataAssignment.totalMarks}
                                      </>
                                    ) : (
                                      <>(Not graded)</>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                            {spin ? (
                              <div className="row justify-content-center">
                                <Spinner />
                              </div>
                            ) : (
                              <>
                                {showBar ? (
                                  <>
                                    <div
                                      className="row progress"
                                      style={{ margin: 5 }}
                                    >
                                      <div
                                        className="progress-bar progress-bar-striped progress-bar-animated"
                                        role="progressbar"
                                        aria-valuenow={progress}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: progress }}
                                      ></div>
                                    </div>
                                    {/* <p className="text-muted">
  Muted text with a{" "}
  
  .
</p> */}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {ctx.studentFiles.url ? (
                                  <div
                                    className="alert alert-white border-primary"
                                    role="alert"
                                  >
                                    <div className="row justify-content-between">
                                      <div className="col-auto">
                                        <AiOutlineFile
                                          style={{ fontSize: 15 }}
                                        />
                                        <button
                                          type="button"
                                          className="btn paraTopic btn-link text-primary text-break"
                                          onClick={openFileStudent}
                                        >
                                          {ctx.studentFiles.fileName}
                                        </button>
                                      </div>
                                      <div className="col-auto">
                                        <MdDelete
                                          style={{ fontSize: 20 }}
                                          onClick={deleteFile}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <></> //   subheadingTopic   paraTopic
                                )}
                                {ctx.studentFiles.url === false &&
                                showBar === false ? (
                                  <form onSubmit={formHandler}>
                                    <div className="mb-3 input-group paraTopic">
                                      <input
                                        type="file"
                                        className="input form-control"
                                        required
                                      />
                                    </div>
                                    <div className="input-group paraTopic d-grid">
                                      <button
                                        type="submit"
                                        className="btn text-white"
                                        style={{ backgroundColor: "darkblue" }}
                                      >
                                        <TiPlus style={{ marginRight: 5 }} />
                                        Add
                                      </button>
                                    </div>
                                  </form>
                                ) : (
                                  <></>
                                )}
                              </>
                            )}
                          </div>
                        </div>
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

export default DashboardAssignment;
