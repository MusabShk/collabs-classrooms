import { React, useEffect, useContext, useState, useRef } from "react";
import TopNavbar from "../../navbar/Navbar";
import { MdOutlineAssignment } from "react-icons/md";
import { useParams } from "react-router-dom";
import AuthUser from "../../../store/auth-context";
import Spinner from "../../spinner/Spinner";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useHistory } from "react-router-dom";
import Loader from "../../loader/Loader";
import { storage } from "../../../firebase";
import { TiPlus } from "react-icons/ti";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { AiOutlineFile } from "react-icons/ai";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Dashboard = () => {
  const closeMarksModal = useRef();
  const [showSpin, setShowSpin] = useState(false);
  const [showSpinn, setShowSpinn] = useState(false);
  const [modalForFile, setModalForFile] = useState({
    file: false,
    marks: "0",
  });
  const [sig, setSig] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [showDownload, setShowDownload] = useState(true);
  const history = useHistory();
  // const [loader,setLoader]=useState(true)
  const [loading, setLoading] = useState(true);
  const [subjectData, setSubjectData] = useState();
  const params = useParams();
  const ctx = useContext(AuthUser);
  // const [assignmentsData, setAssignmentsData] = useState();

  const fetchData = (signal) => {
    // console.log("hiii");
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
    // setLoading(true);
    // const ttt = () => {
    //   fetch(
    //     `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements.json`
    //   )
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((data) => {
    //       for (const key in data) {
    //         allAnnouncements.push({
    //           id: key,
    //           organisation: data[key].organisation,
    //           role: data[key].role,
    //           subject: data[key].subject,
    //           text: data[key].text,
    //           //   subjects: data[key].subjects,
    //         });
    //       }
    //       setAllAnnouncements((prevState) => {
    //         return {
    //           ...prevState,
    //           hodAnnouncements: allAnnouncements.filter((obj) => {
    //             return (
    //               obj.organisation === localStorage.getItem("organisation") &&
    //               obj.role === 1
    //             );
    //           }),
    //         };
    //       });
    //       setAllAnnouncements((prevState) => {
    //         return {
    //           ...prevState,
    //           mineAnnouncements: allAnnouncements.filter((obj) => {
    //             return (
    //               obj.organisation === localStorage.getItem("organisation") &&
    //               obj.role === 2 &&
    //               obj.subject === user.subject
    //             );
    //           }),
    //         };
    //       });
    //       setSpinnerShow(false);

    //       // resolve();
    //     });
    // };

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
          // console.log(branches);
          dataBranch = branches.find((o) => o.name === user.branch);
          // console.log(dataBranch, "daf");
          ctx.setDataBranch(dataBranch);
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
          var ass = assignments.filter((obj) => {
            return obj.id === params.assignmentid;
          });
          // setSubjectData(...currentSubject);
          ctx.setDataSubject(...currentSubject);
          ctx.setDataSubjects(subjects);
          let exass = { ...ass };
          // console.log(exass[0].faculty);
          if (exass[0].files.faculty !== false) {
            for (const key in exass[0].files.faculty) {
              ctx.setFacultyFile((prevState) => {
                return {
                  ...prevState,
                  url: exass[0].files.faculty[key].url,
                  name: exass[0].files.faculty[key].name,
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
          if (exass[0].files.students !== false) {
            let allAss = [];
            for (const key in exass[0].files.students) {
              allAss.push({
                id: key,
                name: exass[0].files.students[key].name,
                url: exass[0].files.students[key].url,
                rollnumber: exass[0].files.students[key].rollnumber,
                fileName: exass[0].files.students[key].fileName,
                marks: exass[0].files.students[key].marks,
              });
            }
            ctx.setStudentFiles(allAss);
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
          // setShowFileUpload(true);
          // } else {
          //   // setShowFileUpload(false);
          //   ctx.setUrl(false);
          // }
          ctx.setDataAssignment(...ass);
          ctx.setRefresh(!ctx.refresh);

          setShowSpinn(false);

          setSpin(false);
          // setLoading(false);
          // ctx.setDataBranch(branches.find((o) => o.name === user.branch));
          // ttt();
          // resolve();
          //   ctx.setBranches(branches);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          } else {
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
        // setCurrentUser(user);
        ctx.setUserData(user);
        ooo();
        // resolve();
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          // setError(err);
        }
      });
  };

  // const fetchData = () => {
  //   let user;
  //   fetch("https://crm-management-6790c-default-rtdb.firebaseio.com/users.json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const users = [];
  //       for (const key in data) {
  //         users.push({
  //           id: key,
  //           name: data[key].name,
  //           email: data[key].email,
  //           password: data[key].password,
  //           role: data[key].role,
  //           organisation: data[key].organisation,
  //           announcements: data[key].announcements,
  //           branch: data[key].branch,
  //           subject: data[key].subject,
  //         });
  //       }

  //       user = users.find(
  //         (x) => x.name === localStorage.getItem("crmUserName")
  //       );
  //       console.log(user, "mm");
  //       // setCurrentUser(user);
  //       ctx.setUserData(user);
  //       fetch(
  //         `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation.json`
  //       )
  //         .then((response) => {
  //           return response.json();
  //         })
  //         .then((data) => {
  //           const allOrg = [];
  //           console.log(user.branch, "branchhhhh");

  //           for (const key in data) {
  //             allOrg.push({
  //               id: key,
  //               name: data[key].name,
  //               type: data[key].type,
  //               hod: data[key].hod,
  //               branches: data[key].branch,
  //               //   subjects: data[key].subjects,
  //             });
  //           }

  //           var result = allOrg.filter((obj) => {
  //             return obj.name === localStorage.getItem("organisation");
  //           });
  //           console.log(result, "mehu");

  //           // ctx.setDataOrganisation((prevState) => {
  //           //   return {
  //           //     ...prevState,
  //           //     id: result[0].id,
  //           //     ...result[0],
  //           //   };
  //           // });
  //           const branches = [];
  //           for (const key in result[0].branches) {
  //             branches.push({
  //               id: key,
  //               ...result[0].branches[key],
  //             });
  //           }
  //           // console.log(branches);
  //           let dataBranch = branches.find((o) => o.name === user.branch);
  //           // console.log(dataBranch, "daf");
  //           const subjects = [];
  //           for (const key in dataBranch.subjects) {
  //             subjects.push({
  //               id: key,
  //               ...dataBranch.subjects[key],
  //             });
  //           }
  //           var currentSubject = subjects.filter((obj) => {
  //             return obj.name === user.subject;
  //           });
  //           const assignments = [];
  //           for (const key in currentSubject[0].assignments) {
  //             assignments.push({
  //               id: key,
  //               ...currentSubject[0].assignments[key],
  //             });
  //           }
  //           // console.log(assignments, "dekho");
  //           // setAssignmentsData(assignments);
  //           setSubjectData(...currentSubject);
  //           //   ctx.setDataSubjects(subjects);
  //           // ctx.setDataBranch(branches.find((o) => o.name === user.branch));
  //           var ass = assignments.filter((obj) => {
  //             return obj.id === params.assignmentid;
  //           });
  //           ctx.setDataAssignment(...ass);
  //           // setLoading(false);
  //           //   ctx.setBranches(branches);
  //         });
  //     });
  // };

  const deleteAssignment = () => {
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
    // ctx.setDataAssignment(false);
    let i = 0;
    for (const key in ctx.dataAssignments) {
      i++;
    }

    if (i === 1) {
      fetch(
        `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects/${ctx.dataSubject.id}/assignments.json`,
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
          const one = () => {
            return new Promise((resolve, reject) => {
              resolve(setLoading(false));
            });
          };
          const two = () => {
            history.push(
              `/${localStorage.getItem("organisation")}/teacher/dashboard`
            );
          };
          const call = async () => {
            await one();
            two();
          };
          call();
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          } else {
            // setError(err);
          }
        });
    } else {
      fetch(
        `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects/${ctx.dataSubject.id}/assignments/${ctx.dataAssignment.id}.json`,
        {
          signal: sig,
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
          const one = () => {
            return new Promise((resolve, reject) => {
              resolve(setLoading(false));
            });
          };
          const two = () => {
            history.push(
              `/${localStorage.getItem("organisation")}/teacher/dashboard`
            );
          };
          const call = async () => {
            await one();
            two();
          };
          call();
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          } else {
            console.log(err);
            // setError(err);
          }
        });
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setSig(signal);
    if (
      localStorage.getItem("loggedIn") === "78tech" ||
      localStorage.getItem("loggedIn") === "guest"
    ) {
      setLoading(false);
      if (!ctx.dataAssignment || !ctx.dataAssignments) {
        fetchData(signal);
      }
      // if (ctx.dataAssignment && ctx.dataAssignment.files.faculty !== false) {
      //   for (const key in ctx.dataAssignment.files.faculty) {
      //     ctx.setFacultyFile((prevState) => {
      //       return {
      //         ...prevState,
      //         url: ctx.dataAssignment.files.faculty[key].url,
      //         name: ctx.dataAssignment.files.faculty[key].name,
      //       };
      //     });
      //     // ctx.setFacultyFile(ctx.dataAssignment.files.faculty[key]);
      //   }
      // } else {
      //   ctx.setFacultyFile((prevState) => {
      //     return {
      //       ...prevState,
      //       url: false,
      //       name: false,
      //     };
      //   });
      // }

      // setShowFileUpload(true);
      // } else {
      //   // setShowFileUpload(false);
      //   ctx.setUrl(false);
      // }

      // fetchData();
    } else {
      history.push("/");
    }
    return () => controller.abort();
  }, []);
  const [spin, setSpin] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showBar, setShowBar] = useState(false);

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
    setSpin(true);
    const desertRef = ref(
      storage,
      `/${localStorage.getItem("organisation")}/${localStorage.getItem(
        "branch"
      )}/${ctx.dataSubject.name}/${params.assignmentid}/faculty/${
        ctx.facultyFile.name
      }`
    );

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        fetch(
          `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects/${ctx.dataSubject.id}/assignments/${ctx.dataAssignment.id}/files/faculty.json`,
          {
            signal: sig,
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
            fetchData();
          })
          .catch((err) => {
            if (err.name === "AbortError") {
            } else {
              console.log(err);
              // setError(err);
            }
          });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  // const deleteFileHandler = () => {};

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
      )}/${ctx.dataSubject.name}/${params.assignmentid}/faculty/${file.name}`
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
            name: file.name,
          };
          fetch(
            `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects/${ctx.dataSubject.id}/assignments/${ctx.dataAssignment.id}/files/faculty.json`,
            {
              signal: sig,
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
              fetchData();
            })
            .catch((err) => {
              if (err.name === "AbortError") {
              } else {
                console.log(err);
                // setError(err);
              }
            });
        });
      }
    );
  };

  const openFileStudent = (eachFile) => {
    window.open(eachFile.url);
  };
  const openFileFaculty = () => {
    window.open(ctx.facultyFile.url);
  };

  // const marksChangeHandler = (file, event) => {
  //   if (marksFile.name === file.name || marksFile.name === "") {
  //     setShowSaveChanges(true);
  //     setMarksFile((prevState) => {
  //       return { ...prevState, name: file.name };
  //     });
  //     setMarksFile((prevState) => {
  //       return { ...prevState, marks: event.target.value };
  //     });
  //   } else {
  //     alert("Please save earlier changes");
  //   }
  // };

  const setData = (file) => {
    setModalForFile((prevState) => {
      return { ...prevState, file: file, marks: file.marks };
    });
  };

  const marksChangeHandler = (event) => {
    if (
      event.target.value > parseInt(ctx.dataAssignment.totalMarks) ||
      event.target.value < parseInt("0")
    ) {
      return;
    } else {
      setModalForFile((prevState) => {
        return { ...prevState, marks: event.target.value };
      });
    }
  };

  const submitMarksHandler = () => {
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
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects/${ctx.dataSubject.id}/assignments/${ctx.dataAssignment.id}/files/students/${modalForFile.file.id}/marks.json`,
      {
        signal: sig,
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parseInt(modalForFile.marks).toString()),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        closeMarksModal.current.click();
        setShowSpinn(true);
        fetchData(sig);
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

  const closeModal = () => {
    setTimeout(() => {
      setModalForFile((prevState) => {
        return { ...prevState, file: false, marks: "0" };
      });
    }, 150);
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavbar />
          {ctx.dataAssignment && ctx.dataAssignments ? (
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
                    <div className="col-auto btn-group dropend">
                      <BiDotsVerticalRounded
                        style={{ fontSize: 30 }}
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                      />

                      <ul className="dropdown-menu" onClick={deleteAssignment}>
                        <li className="dropdown-item">
                          <MdDelete style={{ marginRight: 10, fontSize: 20 }} />
                          Delete
                        </li>
                      </ul>
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
                  <div className="row shadow p-3 mb-5 bg-body rounded">
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
                    <div className="row justify-content-center">
                      <LineChart />
                    </div>
                    <div
                      className="row smallFontPara text-center"
                      style={{ paddingTop: 20, opacity: 0.5 }}
                    >
                      <p className="text-muted">
                        Please grade all students to generate unbiased results
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-1"></div>
                <div className="col-11 ">
                  <div className="row">
                    <div className="col-md-8">
                      {showSpinn ? (
                        <div className="row justify-content-center">
                          <Spinner />
                        </div>
                      ) : (
                        <>
                          <div className="card" style={{ marginBottom: 10 }}>
                            <div className="card-body">
                              {ctx.dataAssignment.files.students === false ? (
                                <>
                                  <div className="row ">
                                    <p className="boldFontSubHeading">
                                      Student Work
                                    </p>
                                  </div>
                                  <div className="row justify-content-center">
                                    <img
                                      src="/nosubmissions.png"
                                      className="card-img"
                                      alt="..."
                                      style={{ width: 230 }}
                                    />
                                  </div>
                                  <div className="row justify-content-center boldFontSubHeading ">
                                    No submissions done yet !
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div
                                    className="row"
                                    style={{ paddingBottom: 5 }}
                                  >
                                    <p className="boldFontSubHeading">
                                      Student Work
                                    </p>
                                  </div>
                                  {ctx.studentFiles.map((eachFile, index) => (
                                    <div className="row" key={index}>
                                      <hr
                                        style={{ height: 1, color: "#CCCCCC" }}
                                      />
                                      <div className="col-md-4 paraTopic">
                                        Student Name:&nbsp;&nbsp;&nbsp;&nbsp;
                                        {eachFile.name}
                                      </div>
                                      <div className="col-md-6">
                                        <div className="paraTopic" role="alert">
                                          <AiOutlineFile
                                            style={{ fontSize: 15 }}
                                          />
                                          <button
                                            type="button"
                                            className="btn btn-link text-primary text-break"
                                            onClick={() =>
                                              openFileStudent(eachFile)
                                            }
                                          >
                                            {eachFile.fileName}
                                          </button>
                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        <button
                                          type="button"
                                          style={{
                                            color: "darkblue",
                                            borderColor: "darkblue",
                                          }}
                                          className="btn btn-white paraTopic"
                                          data-bs-toggle="modal"
                                          data-bs-target="#staticBackdrop"
                                          onClick={() => setData(eachFile)}
                                        >
                                          view marks
                                        </button>
                                      </div>
                                    </div>

                                    // <div
                                    //   className="alert alert-white border-primary paraTopic"
                                    //   role="alert"
                                    //   key={index}
                                    // >
                                    //   <div className="row justify-content-between">
                                    //     <div className="col-auto">
                                    //       <AiOutlineFile style={{ fontSize: 15 }} />
                                    //       <button
                                    //         type="button"
                                    //         className="btn btn-link text-primary text-break"
                                    //         onClick={() =>
                                    //           openFileStudent(eachFile)
                                    //         }
                                    //       >
                                    //         {eachFile.fileName}
                                    //       </button>
                                    //     </div>
                                    //     <div className="col-auto ">
                                    //       Student Name: {eachFile.name}
                                    //     </div>
                                    //   </div>
                                    // </div>
                                  ))}
                                  <div
                                    className="modal fade"
                                    id="staticBackdrop"
                                    data-bs-backdrop="static"
                                    data-bs-keyboard="false"
                                    aria-labelledby="staticBackdropLabel"
                                    aria-hidden="true"
                                  >
                                    <div className="modal-dialog modal-dialog-centered">
                                      <div className="modal-content">
                                        <div className="modal-header subheadingTopic">
                                          <h5
                                            className="modal-title"
                                            id="staticBackdropLabel"
                                          >
                                            Assignment Grade
                                          </h5>
                                          <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            ref={closeMarksModal}
                                            onClick={closeModal}
                                          ></button>
                                        </div>
                                        <div className="modal-body">
                                          <div className="row justify-content-center">
                                            <div className="col-md-10 ">
                                              <div className="row">
                                                <div className="card border-white">
                                                  <div className="card-body text-dark">
                                                    <div className="mb-3 paraTopic">
                                                      <label className="form-label">
                                                        Marks
                                                      </label>
                                                      <input
                                                        type="number"
                                                        className="form-control"
                                                        value={
                                                          modalForFile.marks
                                                        }
                                                        placeholder="Marks Obtained"
                                                        onChange={
                                                          marksChangeHandler
                                                        }
                                                      />
                                                    </div>
                                                    {showSpin ? (
                                                      <div className="row justify-content-center">
                                                        <Spinner />
                                                      </div>
                                                    ) : (
                                                      <div className="mb-3 d-grid">
                                                        <button
                                                          type="button"
                                                          className="btn text-white paraTopic"
                                                          style={{
                                                            backgroundColor:
                                                              "darkblue",
                                                          }}
                                                          onClick={
                                                            submitMarksHandler
                                                          }
                                                        >
                                                          Submit
                                                        </button>
                                                      </div>
                                                    )}
                                                  </div>
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
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="col-md-4 ms-auto">
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <p className="boldFontSubHeading">
                              Your Attachements
                            </p>
                          </div>
                          {/* <h4>uploaded:{progress}%</h4> */}
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
                              {ctx.facultyFile.url ? (
                                <div
                                  className="alert alert-white border-primary"
                                  role="alert"
                                >
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
                              {ctx.facultyFile.url === false &&
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

export default Dashboard;
