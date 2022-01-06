import { useContext } from "react";
import { ImMenu } from "react-icons/im";
import { RiUserLine } from "react-icons/ri";
import AuthUser from "../../store/auth-context";
import Logo from "../../logo 1.1.png";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import "./Navbar.css";
import { HiSpeakerphone } from "react-icons/hi";
import { BrowserRouter, useHistory, Redirect } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { RiGitBranchFill } from "react-icons/ri";
import { ImBooks } from "react-icons/im";
// import AuthUser from "../../store/auth-context";

const TopNavbar = () => {
  // const ctx = useContext(AuthUser);

  const ctx = useContext(AuthUser);
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("crmUserName");
    localStorage.removeItem("organisation");
    localStorage.removeItem("role");
    localStorage.removeItem("branch");
    localStorage.removeItem("branchname");
    localStorage.removeItem("rollnumber");
    localStorage.removeItem("subject");
    history.push("/");
  };
  return (
    <nav className="navbar navbar-light subheadingTopic">
      <div className="container-fluid">
        <button
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
          style={{ border: "none" }}
          className="bg-white"
        >
          <ImMenu />
        </button>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-white dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <RiUserLine />
          </button>
          <ul className="dropdown-menu dropdown-menu-end row">
            <span className="badge bg-light text-dark smallFontPara">
              This account is managed by &nbsp;
              <span className="badge alert-primary smallFontPara">
                {localStorage.getItem("crmUserName")}
              </span>
            </span>
            <li onClick={logoutHandler} className="dropdown-item">
              <BiLogOutCircle /> Logout
            </li>
            {/* <li>
              <button className="dropdown-item" type="button">
                Something else here
              </button>
            </li> */}
          </ul>
        </div>
        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex="-1"
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
          style={{ backgroundColor: "darkblue" }}
        >
          <div className="offcanvas-header">
            <img src={Logo} style={{ width: 100 }} />
            <div className="heading text-white"> &nbsp;Collabs &nbsp;</div>
            <button
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{
                border: "none",
                backgroundColor: "darkblue",
              }}
            >
              <BsFillArrowLeftCircleFill style={{ color: "white" }} />
            </button>
            {/* <div
              className="offcanvas-title "
              id="offcanvasScrollingLabel"
            ></div> */}
          </div>
          <div className="offcanvas-body">
            {localStorage.getItem("role") === "0" ||
            localStorage.getItem("role") === "4" ? (
              <nav className="nav flex-column">
                <NavLink
                  className="nav-link"
                  activeClassName="nav-link text-white "
                  to="/admin/dashboard"
                >
                  <MdSpaceDashboard
                    // activeClassName="icon "
                    style={{
                      width: 30,
                      height: 30,
                      marginRight: 20,
                    }}
                  />
                  Dashboard
                </NavLink>
                <NavLink
                  className="nav-link"
                  activeClassName="nav-link text-white"
                  to="/admin/announcement"
                >
                  <HiSpeakerphone
                    // activeClassName=""
                    style={{
                      width: 30,
                      height: 30,
                      marginRight: 20,
                    }}
                  />
                  Announcement
                </NavLink>
                <a className="nav-link disabled">Disabled</a>
              </nav>
            ) : (
              <></>
            )}

            {localStorage.getItem("role") === "1" ||
            localStorage.getItem("role") === "4.1" ? (
              <>
                <nav className="nav flex-column">
                  <NavLink
                    className="nav-link"
                    activeClassName="nav-link text-white "
                    to={`/${localStorage.getItem(
                      "organisation"
                    )}/hod/dashboard`}
                  >
                    <div data-bs-dismiss="offcanvas">
                      <MdSpaceDashboard
                        // activeClassName="icon "
                        style={{
                          width: 30,
                          height: 30,
                          marginRight: 20,
                        }}
                      />
                      Dashboard
                    </div>
                  </NavLink>
                  &nbsp;
                  {ctx.branches ? (
                    <>
                      {ctx.branches.length !== 0 ? (
                        <>
                          <h4>
                            <span
                              className="badge"
                              style={{
                                color: "darkblue",
                                backgroundColor: "#EDF4FF",
                              }}
                            >
                              <RiGitBranchFill
                                // activeClassName="icon "
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 18,
                                  marginLeft: 7,
                                  color: "darkblue",
                                }}
                              />
                              Branch
                              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                          </h4>
                          {ctx.branches.map((branch) => (
                            // console.log(branch, "nav")
                            <NavLink
                              key={branch.id}
                              className="nav-link"
                              activeClassName="nav-link text-white "
                              to={`/${localStorage.getItem(
                                "organisation"
                              )}/hod/branch/${branch.name.trim()}`}
                              // to={`/${localStorage
                              //   .getItem("organisation")
                              //   .toLowerCase()
                              //   .replace(/\s/g, "")}/hod/dashboard`}
                            >
                              <div data-bs-dismiss="offcanvas">
                                <FaLongArrowAltRight
                                  // activeClassName="icon "
                                  style={{
                                    width: 30,
                                    height: 30,
                                    marginRight: 20,
                                  }}
                                />
                                {branch.name.trim()}
                              </div>
                            </NavLink>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </nav>
              </>
            ) : (
              <></>
            )}
            {localStorage.getItem("role") === "2" ||
            localStorage.getItem("role") === "4.2" ? (
              <>
                <nav className="nav flex-column" data-bs-dismiss="offcanvas">
                  <NavLink
                    className="nav-link"
                    activeClassName="nav-link text-white "
                    to={`/${localStorage.getItem(
                      "organisation"
                    )}/teacher/dashboard`}
                  >
                    <MdSpaceDashboard
                      // activeClassName="icon "
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 20,
                      }}
                    />
                    Dashboard
                  </NavLink>
                  {ctx.dataStudents ? (
                    <>
                      {ctx.dataStudents.length !== 0 ? (
                        <NavLink
                          className="nav-link"
                          activeClassName="nav-link text-white "
                          to={`/${localStorage.getItem(
                            "organisation"
                          )}/teacher/students`}
                        >
                          <FaUsers
                            // activeClassName="icon "
                            style={{
                              width: 30,
                              height: 30,
                              marginRight: 20,
                            }}
                          />
                          Students
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}

                  {/* <NavLink
                  className="nav-link"
                  activeClassName="nav-link text-white"
                  to="/admin/announcement"
                >
                  <HiSpeakerphone
                    // activeClassName=""
                    style={{
                      width: 30,
                      height: 30,
                      marginRight: 20,
                    }}
                  />
                  Announcement
                </NavLink> */}
                </nav>
              </>
            ) : (
              <></>
            )}
            {localStorage.getItem("role") === "3" ||
            localStorage.getItem("role") === "4.3" ? (
              <>
                <nav className="nav flex-column" data-bs-dismiss="offcanvas">
                  <NavLink
                    className="nav-link"
                    activeClassName="nav-link text-white "
                    to={`/${localStorage.getItem(
                      "organisation"
                    )}/student/events&announcements`}
                  >
                    <HiSpeakerphone
                      // activeClassName="icon "
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 20,
                      }}
                    />
                    Events and Announcements
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    activeClassName="nav-link text-white "
                    to={`/${localStorage.getItem(
                      "organisation"
                    )}/student/course`}
                  >
                    <ImBooks
                      // activeClassName="icon "
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 20,
                      }}
                    />
                    Course
                  </NavLink>
                </nav>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
    // <ul className="nav bg-warning">
    //   <li className="nav-item">
    //     <button
    //       type="button"
    //       data-bs-toggle="offcanvas"
    //       data-bs-target="#offcanvasScrolling"
    //       aria-controls="offcanvasScrolling"
    //       style={{ border: "none" }}
    //       className="bg-warning"
    //     >
    //       <ImMenu />
    //     </button>
    //   </li>
    //   <div
    //     className="offcanvas offcanvas-start"
    //     data-bs-scroll="true"
    //     data-bs-backdrop="false"
    //     tabIndex="-1"
    //     id="offcanvasScrolling"
    //     aria-labelledby="offcanvasScrollingLabel"
    //   >
    //     <div className="offcanvas-header">
    //       <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
    //         Colored with scrolling
    //       </h5>
    //       <button
    //         type="button"
    //         className="btn-close text-reset"
    //         data-bs-dismiss="offcanvas"
    //         aria-label="Close"
    //       ></button>
    //     </div>
    //     <div className="offcanvas-body">
    //       <p>
    //         Try scrolling the rest of the page to see this option in action.
    //       </p>
    //     </div>
    //   </div>
    // </ul>
  );
};

export default TopNavbar;
