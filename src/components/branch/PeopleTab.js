import AuthUser from "../../store/auth-context";
import { useContext } from "react";
import { FaUserTie, FaUsers } from "react-icons/fa";

// import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useState } from "react";
// import AuthUser from "../../store/auth-context";
import Spinner from "../spinner/Spinner";
const PeopleTab = (props) => {
  const ctx = useContext(AuthUser);

  // console.log(props, "prpr");
  //   const [userData, setUserData] = useState({
  //     name: "",
  //     email: "",
  //     password: "",
  //   });
  // const [upArrow, setUpArrow] = useState(false);
  //   const ctx = useContext(AuthUser);

  // const handleArrowChange = () => {
  //   // event.persist();
  //   setUpArrow((prevState) => {
  //     return !prevState;
  //   });
  // };

  return (
    <>
      {ctx.dataSubjects && ctx.multiLoad === false ? (
        <>
          <div className="row" style={{ paddingTop: 30 }}>
            <blockquote className="blockquote">
              <p className="headingTopic">Teachers</p>
              <hr style={{ height: 3, color: "#01139F" }} />
            </blockquote>
          </div>

          <div className="row">
            {ctx.dataSubjects.map((subject, index) => (
              <div key={index}>
                <div className="row justify-content-between subheadingTopic">
                  <div className="col-8">
                    <FaUserTie style={{ margin: 10, color: "434343" }} />
                    {subject.faculty.name}
                    <span className="paraTopic">
                      &nbsp; ({subject.faculty.email})
                    </span>
                  </div>
                  <div className="col-4">
                    <div className="row">
                      <div className="col-auto boldFontSubHeading">
                        Subject:
                      </div>
                      <div className="col-auto subheadingTopic">
                        {subject.name}
                      </div>
                    </div>
                  </div>
                </div>
                <hr style={{ height: 1, color: "#CCCCCC" }} />
              </div>
              //   console.log(subject.faculty.name);
            ))}
          </div>

          <div className="row" style={{ paddingTop: 30 }}>
            <blockquote className="blockquote">
              <p className="headingTopic">Students</p>
              <hr style={{ height: 3, color: "#01139F" }} />
            </blockquote>
          </div>

          <div className="row">
            {ctx.dataStudents ? (
              <>
                {ctx.dataStudents.map((student, index) => (
                  <div key={index}>
                    <div className="row justify-content-between subheadingTopic">
                      <div className="col-8">
                        <FaUsers style={{ margin: 10, color: "434343" }} />
                        {student.name}
                        <span className="paraTopic">
                          &nbsp; ({student.email})
                        </span>
                      </div>
                      <div className="col-4">
                        <div className="row">
                          <div className="col-auto boldFontSubHeading">
                            Roll Number:
                          </div>
                          <div className="col-auto subheadingTopic">
                            {student.rollnumber}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr style={{ height: 1, color: "#CCCCCC" }} />
                  </div>
                  //   console.log(subject.faculty.name);
                ))}
              </>
            ) : (
              <div className="row paraTopic">
                <div className="col-auto">(No students)</div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {ctx.multiLoad ? (
            <div className="row  justify-content-center">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="row justify-content-center">
                <img
                  src="/nopeople.png"
                  className="card-img"
                  alt="..."
                  style={{ width: 300 }}
                />
              </div>
              <div className="row justify-content-center boldFontSubHeading ">
                No People here !
              </div>

              <div
                className="row paraTopic text-center"
                style={{ paddingTop: 20 }}
              >
                <span>
                  Add People by adding Subjects
                  {/* <text
                      className="text-primary"
                      onClick={() => {
                        addSubject.current.click();
                      }}
                    >
                      {" "}
                      Add Subjects{" "}
                    </text> */}
                </span>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default PeopleTab;
