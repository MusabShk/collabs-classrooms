import { useState, useEffect, useContext, useRef } from "react";
import { MdDelete } from "react-icons/md";
import AuthUser from "../../../store/auth-context";
import TopNavbar from "../../navbar/Navbar";
import Spinner from "../../spinner/Spinner";
import { FaUserTie, FaUsers } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Loader from "../../loader/Loader";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storage } from "../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewStudents = () => {
  const [deleteStudentAssignmentData, setDeleteStudentAssignmentData] =
    useState({
      assignmentKey: false,
      fileKey: false,
    });
  const [sig, setSig] = useState();
  const history = useHistory();
  const [showSpin, setShowSpin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setSig(signal);
    if (
      localStorage.getItem("loggedIn") === "78tech" ||
      localStorage.getItem("loggedIn") === "guest"
    ) {
      if (ctx.dataStudents) {
        // setShowSpin(false);
        setLoading(false);
      } else {
        setShowSpin(true);
        setLoading(false);
        fetchData(signal);
      }
    } else {
      history.push("/");
    }
    return () => controller.abort();
  }, []);
  const ctx = useContext(AuthUser);

  const fetchData = (signal) => {
    // setLoading(false);
    // setSpinnerShow(true);
    let user;
    fetch(
      "https://crm-management-6790c-default-rtdb.firebaseio.com/users.json",
      { signal: signal }
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

        user = users.find(
          (x) => x.name === localStorage.getItem("crmUserName")
        );
        // console.log(user, "mm");
        // setCurrentUser(user);
        // ctx.setUserData(user);
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
                //   subjects: data[key].subjects,
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
            // console.log(branches);
            let dataBranch = branches.find((o) => o.name === user.branch);
            const students = [];
            for (const key in dataBranch.students) {
              students.push({
                id: key,
                ...dataBranch.students[key],
              });
            }
            ctx.setDataStudents(students);
            const subjects = [];
            for (const key in dataBranch.subjects) {
              subjects.push({
                id: key,
                ...dataBranch.subjects[key],
              });
            }
            var currentSubject = subjects.filter((obj) => {
              return obj.name === user.subject;
            });
            const assignments = [];
            for (const key in currentSubject[0].assignments) {
              assignments.push({
                id: key,
                ...currentSubject[0].assignments[key],
              });
            }
            // console.log(assignments, "dekho");
            // setAssignmentsData(assignments);
            // setSubjectData(...currentSubject);
            ctx.setDataSubjects(subjects);
            ctx.setDataBranch(branches.find((o) => o.name === user.branch));
            setLoading(false);
            //   ctx.setBranches(branches);
            setShowSpin(false);
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
  // console.log(ctx.dataBranch);
  const deleteStudentHandler = (student) => {
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
    let i = 0;
    let finalResult;
    // ctx.setDataAssignment(false);
    const aaa = () => {
      for (const key in ctx.dataStudents) {
        i++;
      }
    };

    const bbb = () => {
      return new Promise((resolve, reject) => {
        fetch(
          `https://crm-management-6790c-default-rtdb.firebaseio.com/users.json`,
          { signal: sig }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const allStudents = [];
            for (const key in data) {
              allStudents.push({
                id: key,
                ...data[key],
              });
            }

            let result = allStudents.filter((obj) => {
              return (
                obj.name === student.name &&
                obj.rollnumber === student.rollnumber &&
                obj.email === student.email
              );
            });
            finalResult = result[0];

            resolve(true);
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

    const ccc = () => {
      return new Promise((resolve, reject) => {
        fetch(
          `https://crm-management-6790c-default-rtdb.firebaseio.com/users/${finalResult.id}.json`,
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
            resolve(true);
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

    const eee = () => {
      if (i === 1) {
        fetch(
          `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/students.json`,
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
              console.log(err);
              // setError(err);
            }
          });
      } else {
        fetch(
          `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/students/${student.id}.json`,
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
            fetchData();
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

    const ddd = () => {
      let j = 0;
      ctx.dataSubjects.map((subject, index) => {
        if (subject.assignments !== false) {
          for (const key in subject.assignments) {
            if (subject.assignments[key].files.students !== false) {
              for (const keyy in subject.assignments[key].files.students) {
                j++;
              }
            }
          }
        }
      });
      ctx.dataSubjects.map((subject, index) => {
        if (subject.assignments !== false) {
          for (const key in subject.assignments) {
            if (subject.assignments[key].files.students !== false) {
              for (const keyy in subject.assignments[key].files.students) {
                if (
                  subject.assignments[key].files.students[keyy].name ===
                    student.name &&
                  subject.assignments[key].files.students[keyy].rollnumber ===
                    student.rollnumber
                ) {
                  if (j === 1) {
                    fetch(
                      `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects/${subject.id}/assignments/${key}/files/students.json`,
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
                        deleteFile(
                          key,
                          student.rollnumber,
                          subject.assignments[key].files.students[keyy].fileName
                        );
                      })
                      .catch((err) => {
                        if (err.name === "AbortError") {
                        } else {
                          console.log(err);
                          // setError(err);
                        }
                      });
                  }
                  if (j > 1) {
                    fetch(
                      `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch/${ctx.dataBranch.id}/subjects/${subject.id}/assignments/${key}/files/students/${keyy}.json`,
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
                        deleteFile(
                          key,
                          student.rollnumber,
                          subject.assignments[key].files.students[keyy].fileName
                        );
                      })
                      .catch((err) => {
                        if (err.name === "AbortError") {
                        } else {
                          console.log(err);
                          // setError(err);
                        }
                      });
                  }
                }
              }
            }
          }
        }
      });
      const deleteFile = (assignmentId, rollNumber, fileName) => {
        const desertRef = ref(
          storage,
          `/${localStorage.getItem("organisation")}/${localStorage.getItem(
            "branch"
          )}/${localStorage.getItem(
            "subject"
          )}/${assignmentId}/students/${rollNumber}/${fileName}`
        );

        // Delete the file
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      };
    };

    const call = async () => {
      aaa();
      await bbb();
      await ccc();
      ddd();
      eee();
    };
    call();
  };

  // ctx.dataSubjects.map((subject, index) => {
  //   if (subject.assignments !== false) {
  //     for (const key in subject.assignments) {
  //       if (subject.assignments[key].files.students !== false) {
  //         for (const keyy in subject.assignments[key].files.students) {
  //           if (
  //             subject.assignments[key].files.students[keyy].name ===
  //               student.name &&
  //             subject.assignments[key].files.students[keyy].rollnumber ===
  //               student.rollnumber
  //           ) {
  //             setDeleteStudentAssignmentData((prevState) => {
  //               return { ...prevState, assignmentKey: key, fileKey: keyy };
  //             });
  //           }
  //         }
  //       }
  //     }
  //   }
  // });

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavbar />
          {showSpin ? (
            <div className="row justify-content-center">
              <Spinner />
            </div>
          ) : (
            <div className="container" style={{ paddingTop: 30 }}>
              <div className="row justify-content-center">
                <div className="col-md-8 shadow p-3 mb-5 bg-body rounded">
                  <div className="row" style={{ paddingTop: 30 }}>
                    <blockquote className="blockquote">
                      <p className="headingTopic">Students</p>
                      <hr style={{ height: 3, color: "#01139F" }} />
                    </blockquote>
                  </div>
                  <div className="row">
                    {ctx.dataStudents.map((student, index) => (
                      <div key={index}>
                        <div className="row justify-content-between subheadingTopic">
                          <div className="col-auto">
                            <FaUsers style={{ margin: 10, color: "434343" }} />
                            {student.name}
                            <span className="paraTopic">
                              &nbsp; ({student.email})
                            </span>
                          </div>
                          <div className="col-auto">
                            <span className="paraTopic">
                              Roll number :{student.rollnumber}{" "}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            <span>
                              <MdDelete
                                style={{ margin: 10, color: "434343" }}
                                onClick={() => deleteStudentHandler(student)}
                              />
                            </span>
                          </div>
                        </div>
                        <hr style={{ height: 1, color: "#CCCCCC" }} />
                      </div>
                      //   console.log(subject.faculty.name);
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ViewStudents;
