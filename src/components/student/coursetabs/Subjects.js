import { React, useState, useEffect, useContext } from "react";
import AuthUser from "../../../store/auth-context";
import {
  BrowserRouter,
  useHistory,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { RiBookMarkFill } from "react-icons/ri";

const Subjects = () => {
  const ctx = useContext(AuthUser);
  const history = useHistory();

  return (
    <>
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
                    history.push(
                      `/${localStorage.getItem(
                        "organisation"
                      )}/student/course/${subject.name}`
                    );
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
                    history.push(
                      `/${localStorage.getItem(
                        "organisation"
                      )}/student/course/${subject.name}`
                    );
                  }}
                >
                  <h5 className="card-title">&nbsp; &nbsp;</h5>
                  {/* <p className="card-text">&nbsp; &nbsp;</p> */}
                </div>
                <div className="card-footer border-white bg-white">
                  {/* <div className="row justify-content-end">
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
                  </div> */}
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

            {/* <div
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
                by clicking the Plus icon on the right corner of block window.
              </div>
            </div> */}
          </>
        )}
      </div>
    </>
  );
};

export default Subjects;
