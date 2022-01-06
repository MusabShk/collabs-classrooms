import { MdOutlineAssignment } from "react-icons/md";
import { BrowserRouter, useHistory } from "react-router-dom";
import AuthUser from "../../store/auth-context";
import { useContext, useState, useEffect } from "react";

const CardAssignment = () => {
  let ass;
  const ctx = useContext(AuthUser);
  const history = useHistory();
  const [pi, setPi] = useState(0);
  useEffect(() => {
    if (pi === 1)
      history.push(
        `/${localStorage.getItem("organisation")}/teacher/assignments/${
          ctx.dataAssignment.id
        }`
      );
  }, [pi]);

  const push = (assignment) => {
    // console.log("55");
    console.log(assignment.files.students);

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
    if (assignment.files.students !== false) {
      let allAss = [];
      for (const key in assignment.files.students) {
        allAss.push({
          id: key,
          name: assignment.files.students[key].name,
          url: assignment.files.students[key].url,
          rollnumber: assignment.files.students[key].rollnumber,
          fileName: assignment.files.students[key].fileName,
          marks: assignment.files.students[key].marks,
        });
      }
      ctx.setStudentFiles(allAss);
      console.log(allAss);
      // let result = allAss.find((obj) => {
      //   return (
      //     obj.name === localStorage.getItem("crmUserName") &&
      //     obj.rollnumber === localStorage.getItem("rollnumber")
      //   );
      // });
      // if (result) {
      //   ctx.setStudentFiles((prevState) => {
      //     return {
      //       ...prevState,
      //       id: result.id,
      //       url: result.url,
      //       name: result.name,
      //       rollnumber: result.rollnumber,
      //       fileName: result.fileName,
      //     };
      //   });
      // } else {
      //   ctx.setStudentFiles((prevState) => {
      //     return {
      //       ...prevState,
      //       id: false,
      //       url: false,
      //       name: false,
      //       rollnumber: false,
      //       fileName: false,
      //     };
      //   });
      // }
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
    // } else {
    //   ctx.setFacultyFile(prevState=>{
    //     return{...prevState,url:false,name:false}
    //   });
    // }
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

export default CardAssignment;
