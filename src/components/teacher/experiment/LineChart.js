import Spinner from "../../spinner/Spinner";
import { Line } from "react-chartjs-2";
import { React, useEffect, useContext, useState } from "react";
import AuthUser from "../../../store/auth-context";

const LineChart = () => {
  const ctx = useContext(AuthUser);
  const [loading, setLoading] = useState(true);
  const [studentNames, setStudentNames] = useState();
  const [marks, setMarks] = useState();
  useEffect(() => {
    let students = [];
    let mark = [];
    if (ctx.dataAssignment.files.students !== false) {
      for (const key in ctx.dataAssignment.files.students) {
        students.push(ctx.dataAssignment.files.students[key].name);
        mark.push(ctx.dataAssignment.files.students[key].marks);
      }
      setStudentNames(students);
      setMarks(mark);
    } else {
      setStudentNames(false);
    }
    setLoading(false);
  }, [ctx.refresh]);

  return (
    <>
      {loading ? (
        <div className="row justify-content-center">
          <Spinner />
        </div>
      ) : (
        <>
          {studentNames ? (
            <div className="paraTopic" style={{ height: 250 }}>
              <Line
                data={{
                  labels: studentNames,
                  datasets: [
                    {
                      label: "Marks",
                      data: marks,
                      fill: false,
                      borderColor: "#00008B",
                      tension: 0.1,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    title: {
                      display: true,
                      text: "Assignment Performance",
                    },
                  },
                }}
              />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default LineChart;
