import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import Spinner from "../spinner/Spinner";
import {
  BrowserRouter,
  useHistory,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import CardRow2 from "../card/CardRow2";
import { TiPlus } from "react-icons/ti";
import AddBranch from "../forms/AddBranch";
import MainBody from "./MainBody";
import AuthUser from "../../store/auth-context";
import { FaUserCircle } from "react-icons/fa";
import DashboardBodyBranchStructure from "./DashboardBodyBranchStructure";
import DashboardBodyStats from "./DashboardBodyStats";
import DashboardBodyNoBranch from "./DashboardBodyNoBranch";
import DashboardBodyEvent from "./DashboardBodyEvent";
import DashboardBodyDisplayEvents from "./DashboardBodyDisplayEvents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardBody = () => {
  const cancel = useRef();

  const addBranch = useRef();
  const [refreshEvents, setRefreshEvents] = useState(false);
  const [showSpin, setShowSpin] = useState(false);
  const ctx = useContext(AuthUser);

  const [showremove, setShowremove] = useState(false);
  const [loading, setLoading] = useState(true);

  const branchTemplate = {
    name: "",
    students: false,
    subjects: false,
  };
  const [branches, setBranches] = useState([branchTemplate]);
  const handleAddBranch = (event) => {
    event.preventDefault();
    const branchTemplate = {
      name: "",
      students: false,
      subjects: false,
    };
    setBranches((prevState) => [...prevState, branchTemplate]);
    setShowremove(true);
  };
  const changeHandler = (index, event) => {
    event.preventDefault();
    event.persist();

    setBranches((prevState) => {
      return prevState.map((item, i) => {
        // console.log(event.target.name, "ittt");
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,

          // faculty: {
          //   ...item.faculty,
          //   [event.target.name]: event.target.value,
          // },
        };
      });
    });
  };

  const handleRemoveField = (e, index) => {
    e.preventDefault();
    // if (count === 1) {
    //   setShowSubmit(false);
    // }
    setBranches((prevState) =>
      prevState.filter((item) => item !== prevState[index])
    );
    var count = 0;
    for (var key in branches) {
      // console.log(count, "count");
      // console.log(branches, "branches");
      count++;
    }

    if (count === 2) {
      setShowremove(false);
    }
  };
  const [sig, setSig] = useState();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setSig(signal);
    setLoading(true);
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
        var result = allOrg.filter((obj) => {
          return obj.name === localStorage.getItem("organisation");
        });
        // result = { ...result, branches: findBranch(result.branches) };
        // console.log(result, "mehu2");

        // setOrganisation(result[0]);
        // console.log(result[0], "helloojii");
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
        let studentCount = 0;
        let facultyCount = 0;
        if (branches.length !== 0) {
          for (const key in branches) {
            studentCount =
              studentCount + Object.keys(branches[key].students).length;
            ctx.setStudentCount(studentCount);
            facultyCount =
              facultyCount + Object.keys(branches[key].subjects).length;
            ctx.setFacultyCount(facultyCount);
          }
        } else {
          ctx.setStudentCount(studentCount);
          ctx.setFacultyCount(facultyCount);
        }

        ctx.setBranches(branches);
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
        setLoading(false);
        // console.log("billii");
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          // setError(err);
          console.log(err);
        }
      });

    return () => controller.abort();
  }, [ctx.refresh]);

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
    // console.log(JSON.stringify(branches));
    // fetch(
    //   `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch.json`,
    //   {
    //     method: "POST", // or 'PUT'
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(...branches),
    //   }
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data, "dattttttttttt");
    //   });
    // let bran = { ...branches };
    // console.log({ ...branches });
    let i = 0;
    for (const key in branches) {
      i++;
    }
    // console.log(Array.values(branches), "bran");

    // console.log(branch);
    // arr.push(branch);
    // var last = branches.length;
    let ii = 0;
    branches.map((branch, index) =>
      fetch(
        `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch.json`,
        {
          signal: sig,
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(branch),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          ii++;
          // console.log(data, "dattttttttttt");
          // console.log(index, "number");
          if (ii === i) {
            cancel.current.click();
            ctx.setRefresh(!ctx.refresh);
            setShowSpin(false);
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          } else {
            // setError(err);
            console.log(err);
          }
        })
    );

    // const f = () => {
    //   return new Promise((resolve, reject) => {

    //     resolve(true);
    //   });
    // };

    // const one = () => {

    // };

    // // const two = () => {};
    // const call = async () => {
    //   await f();
    //   one();
    //   // two();
    // };
    // call();
    // console.log(arr, "arr");
  };
  const history = useHistory();
  // const [organisation, setOrganisation] = useState({
  //   id: "",
  //   name: "",
  //   type: "",
  //   hod: {},
  //   branches: {},
  // });
  // console.log("aagaya");
  // console.log({ outsideRefresh: ctx.refresh });

  // console.log(organisation, "da");

  const refreshHandler = () => {
    // setRefresh(!refresh);
    ctx.setRefresh(!ctx.refresh);
  };

  // console.log(ctx.dataOrganisation);
  // console.log(ctx.branches);

  const clickonAddBranch = () => {
    addBranch.current.click();
  };

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <div className="row  justify-content-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="row justify-content-between">
            <div className="col-8 headingTopic" style={{ marginLeft: 5 }}>
              {ctx.dataOrganisation.name}
            </div>
            <div className="col-auto">
              <a
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ref={addBranch}
              >
                <TiPlus style={{ fontSize: 20 }} />
              </a>

              <div
                className="modal fade"
                id="exampleModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
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
                        Create a Branch
                      </h5>
                      <button
                        onClick={() => setBranches([branchTemplate])}
                        ref={cancel}
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
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
                                    {branches.map((item, index) => (
                                      <div key={`item-${index}`}>
                                        <div className="mb-3">
                                          <label className="form-label paraTopic">
                                            Branch Name:
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control paraTopic"
                                            required
                                            name="name"
                                            value={item.name}
                                            onChange={(e) =>
                                              changeHandler(index, e)
                                            }
                                          />
                                        </div>

                                        <div className="mb-3 d-grid gap-2">
                                          {showremove ? (
                                            <button
                                              className="btn btn-warning"
                                              onClick={(e) => {
                                                handleRemoveField(e, index);
                                              }}
                                            >
                                              Remove Branch
                                            </button>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                    {/* {showSpin ? (
                                      <div className="p-3 row justify-content-center">
                                        <Spinner />
                                      </div>
                                    ) : (
                                      <></>
                                    )} */}
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
                                              onClick={handleAddBranch}
                                              style={{
                                                borderColor: "darkblue",
                                                backgroundColor: "white",
                                                color: "darkblue",
                                              }}
                                            >
                                              Add Branch
                                            </button>
                                          </div>
                                          <div className="col-6 d-grid gap-2">
                                            <button
                                              className="btn btn-primary text-white"
                                              type="submit"
                                              style={{
                                                backgroundColor: "darkblue",
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
          </div>

          <div className="row"></div>
          {ctx.dataOrganisation.branches ? (
            <>
              <div className="row justify-content-center ">
                <div className="col-md-8">
                  <DashboardBodyBranchStructure />
                </div>
                <div className="col-md-4">
                  <DashboardBodyStats />
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-md-8">
                  <DashboardBodyDisplayEvents
                    refreshEvents={refreshEvents}
                    setRefreshEvents={setRefreshEvents}
                  />
                </div>
                <div className="col-md-4">
                  <DashboardBodyEvent
                    refreshEvents={refreshEvents}
                    setRefreshEvents={setRefreshEvents}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row justify-content-center ">
                <div className="col-md-8">
                  <DashboardBodyNoBranch refButton={clickonAddBranch} />
                </div>
                <div className="col-md-4">
                  <DashboardBodyStats />
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-md-8">
                  <DashboardBodyDisplayEvents
                    refreshEvents={refreshEvents}
                    setRefreshEvents={setRefreshEvents}
                  />
                </div>
                <div className="col-md-4">
                  <DashboardBodyEvent
                    refreshEvents={refreshEvents}
                    setRefreshEvents={setRefreshEvents}
                  />
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
