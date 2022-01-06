import { TiPlus } from "react-icons/ti";
import { useState, useEffect, useContext } from "react";
// import { useEffect } from "react";
import AddBranch from "../forms/AddBranch";
import AuthUser from "../../store/auth-context";
// import CardBranch from "../card/CardBranch";
import Spinner from "../spinner/Spinner";
const MainBody = (props) => {
  const ctx = useContext(AuthUser);
  const [loading, setLoading] = useState(true);
  // const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${props.orgId}/branch.json`,
      { signal: signal }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const branches = [];
        for (const key in data) {
          branches.push({
            id: key,
            ...data[key],
          });
        }

        // const result = Object.values(data);
        // console.log(result);
        // console.log(, "mainbody");
        // setBranchData(
        //   //   Object.keys(data),
        //   //   Object.values(data)
        //   branches
        //   //   ...Object.values(data)[0],
        //   //   name: Object.values(data)[0].name,
        //   //   students: Object.values(data)[0].students,
        //   //   subjects: Object.values(data)[0].subjects,
        // );
        ctx.setBranches(branches);
        setLoading(false);

        // console.log(Object.entries(data));
        // for (const [key, value] of Object.entries(data)) {
        //   // console.log(`${key}: ${value}`);
        //   setBranchData((prevState) => {
        //     return { ...prevState, key: value };
        //   });
        // }

        // const branch=[];
        // for (const key in data) {
        //     branch.push({

        //       name: data[key].name,
        //       atudent: data[key].name,

        //       type: data[key].type,
        //     });
        //   }
        // console.log(Object.values(data));
        // setBranchData(Object.values(data));
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          // setError(err);
          console.log(err);
        }
      });
    return () => controller.abort();
  }, []);

  // console.log(branchData, "maindata11111");
  // console.log(ctx.dataBranch, "maindata22222");

  return (
    <>
      {loading ? (
        <div className="row  justify-content-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="row justify-content-between">
            <h3 className="col-auto">Branch Structure</h3>
          </div>
          <div className="row" style={{ paddingTop: 20 }}>
            <table className="table border">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Branch name</th>
                  <th scope="col">Students data</th>
                  <th scope="col">Subjects</th>
                </tr>
              </thead>
              <tbody>
                {ctx.branches.map((branch) => (
                  <tr key={branch.id}>
                    <td>{branch.name}</td>
                    <td>
                      {branch.students ? (
                        <p className="text-primary">View</p>
                      ) : (
                        <p className="text-secondary">No data</p>
                      )}
                    </td>
                    <td>
                      {branch.subjects ? (
                        <p className="text-primary">View</p>
                      ) : (
                        <p className="text-secondary">No data</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default MainBody;
