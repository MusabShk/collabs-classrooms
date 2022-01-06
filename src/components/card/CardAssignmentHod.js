import React from "react";
import { MdOutlineAssignment } from "react-icons/md";
import { BrowserRouter, useHistory, useParams } from "react-router-dom";
// import AuthUser from "../../store/auth-context";
import AuthUser from "../../store/auth-context";
import { useContext, useState, useEffect } from "react";

const CardAssignmentHod = () => {
  const params = useParams();
  let ass;
  const ctx = useContext(AuthUser);
  const history = useHistory();
  const [pi, setPi] = useState(0);
  useEffect(() => {
    if (pi === 1)
      history.push(
        `/${localStorage.getItem("organisation")}/hod/branch/${params.branch}/${
          params.subjectname
        }/${ctx.dataAssignment.id}`
      );
  }, [pi]);

  const push = (assignment) => {
    ass = assignment;
    if (assignment.files.faculty !== false) {
      // const url=[]
      // console.log(assignment.files.faculty);
      for (const key in assignment.files.faculty) {
        ctx.setFacultyFile((prevState) => {
          return {
            ...prevState,
            url: assignment.files.faculty[key].url,
            name: assignment.files.faculty[key].name,
          };
        });
        // ctx.setUrl(assignment.files.faculty[key]);
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
    ctx.setDataAssignment(assignment);
    setPi(1);
    // ctx.setDataAssignment(assignment);
    // setNumb(3);

    // localStorage.setItem("id", assignment.id);
  };
  return ctx.dataAssignments.map((assignment, index) => (
    <div
      className="card rounded-3"
      key={index}
      style={{ marginBottom: 20 }}
      onClick={() => push(assignment)}
    >
      <div className="card-body paraTopic">
        <MdOutlineAssignment
          style={{ fontSize: 25, marginRight: 10, color: "#1266F1" }}
        />
        {assignment.title}
      </div>
      <div className="card-footer bg-white smallFontPara">
        Due Date: {assignment.dueDate}
      </div>
    </div>
  ));
};

export default CardAssignmentHod;
