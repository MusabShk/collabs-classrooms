import { min } from "d3";
import { plugins } from "pretty-format";
import { React, useEffect, useContext, useState } from "react";
import { Bar } from "react-chartjs-2";
import AuthUser from "../../../store/auth-context";
import Spinner from "../../spinner/Spinner";

const BarChart = () => {
  const [loading, setLoading] = useState(true);
  const ctx = useContext(AuthUser);
  const [studentCount, setStudentCount] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);
  useEffect(() => {
    // console.log(ctx.dataBranch.students);
    setStudentCount(Object.keys(ctx.dataBranch.students).length);
    // console.log(ctx.dataAssignment.files.students);
    setSubmissionCount(Object.keys(ctx.dataAssignment.files.students).length);
    setLoading(false);
  }, []);
  //   console.log(studentCount);
  return (
    <>
      {loading ? (
        <div className="row justify-content-center">
          <Spinner />
        </div>
      ) : (
        <>
          {submissionCount === 0 ? (
            <>
              <p className="row justify-content-center paraTopic">
                No Statistics
              </p>
            </>
          ) : (
            <div className="paraTopic" style={{ height: 150 }}>
              <Bar
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    xAxes: {
                      min: 0,
                      max: studentCount,
                    },
                  },
                  indexAxis: "y",
                  elements: {
                    bar: {
                      borderWidth: 2,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                      position: "right",
                    },
                    title: {
                      display: true,
                      text: "Assignment Submissions",
                    },
                  },
                }}
                data={{
                  labels: ["Progress"],
                  datasets: [
                    {
                      label: "Submitted",
                      data: [submissionCount],
                      backgroundColor: "#FFBE1F",
                      borderColor: "#FFBE1F",
                    },
                  ],
                }}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BarChart;
