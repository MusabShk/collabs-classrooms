import { useContext, useEffect, useState, useRef } from "react";
import {
  BrowserRouter,
  useHistory,
  Redirect,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import Loader from "../../../loader/Loader";
import TopNavbar from "../../../navbar/Navbar";
import AuthUser from "../../../../store/auth-context";
import DashboardSubjectAnnouncements from "./DashboardSubjectAnnouncements";
import Spinner from "../../../spinner/Spinner";
import CardWithImage from "../../../card/CardWithImage";
import CardAssignmentStudent from "../../../card/CardAssignmentStudent";
const DashboardSubject = () => {
  const history = useHistory();

  const ctx = useContext(AuthUser);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  // const [spinnerShow, setSpinnerShow] = useState(true);

  const fetchData = (signal) => {
    const aa = () => {
      return new Promise((resolve, reject) => {
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

            ctx.setAllAnnouncements((prevState) => {
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
    const bb = () => {
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
          let currentSubject = subjects.find((obj) => {
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

          ctx.setDataSubject(currentSubject);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          } else {
            console.log(err);
            // setError(err);
          }
        });
    };
    const call = async () => {
      await aa();
      bb();
    };
    call();
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (
      localStorage.getItem("loggedIn") === "stud00" ||
      localStorage.getItem("loggedIn") === "guest"
    ) {
      setLoading(false);
      if (ctx.dataSubjects) {
        let currentSubject = ctx.dataSubjects.find((obj) => {
          return obj.name === params.subjectname.trim();
        });
        const assignments = [];
        for (const key in currentSubject.assignments) {
          assignments.push({
            id: key,
            ...currentSubject.assignments[key],
          });
        }
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
              });
            }

            ctx.setAllAnnouncements((prevState) => {
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
            ctx.setDataAssignments(assignments);
            ctx.setDataSubject(currentSubject);
          })
          .catch((err) => {
            if (err.name === "AbortError") {
            } else {
              console.log(err);
              // setError(err);
            }
          });
      } else {
        setLoading(false);
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
          {ctx.dataSubject ? (
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
                          <DashboardSubjectAnnouncements
                            allAnnouncements={ctx.allAnnouncements}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="row">
                        <div className="card border-white">
                          <div className="card-body">
                            {ctx.dataAssignments.length !== 0 ? (
                              <CardAssignmentStudent />
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

export default DashboardSubject;
