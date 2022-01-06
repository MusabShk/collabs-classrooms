import React from "react";
import { useContext, useEffect, useRef } from "react";
import { GoPrimitiveDot, GoKebabVertical } from "react-icons/go";
import { useHistory } from "react-router-dom";

import AuthUser from "../../store/auth-context";

const DashboardBodyBranchStructure = () => {
  const ctx = useContext(AuthUser);
  const history = useHistory();

  return (
    <>
      <div className="shadow p-3 mb-5 bg-body rounded">
        <div className="row justify-content-between">
          <div className="col-auto boldFontSubHeading">
            <h3>
              <span className="badge" style={{ backgroundColor: "#BB0000" }}>
                Branch
              </span>
            </h3>
          </div>
        </div>
        <div className="row" style={{ paddingTop: 20 }}>
          <table className="table table-borderless">
            <thead
              className="table tableHeading"
              style={{ backgroundColor: "#EDF4FF" }}
            >
              <tr>
                <th scope="col">Branch name</th>
                <th scope="col">Subject / Student data</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody className="tableData ">
              {ctx.branches.map((branch) => (
                <tr key={branch.id}>
                  <td>{branch.name}</td>
                  <td>
                    {branch.students ? (
                      <p
                        className="text-primary"
                        onClick={() =>
                          history.push(
                            `/${branch.name.trim()}/hod/branch/${branch.name.trim()}`
                          )
                        }
                      >
                        View
                      </p>
                    ) : (
                      <p className="text-secondary">No data</p>
                    )}
                  </td>
                  <td>
                    <GoPrimitiveDot style={{ color: "darkblue" }} /> Active{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashboardBodyBranchStructure;
