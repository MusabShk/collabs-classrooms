// import React from "react";
import { useContext, useEffect, useRef } from "react";
import AuthUser from "../../store/auth-context";
import { FaUserTie, FaUsers } from "react-icons/fa";
const DashboardBodyStats = () => {
  const ctx = useContext(AuthUser);

  return (
    <>
      <div className="shadow p-3 mb-5 bg-body rounded">
        <div className="row" style={{ paddingBottom: 20 }}>
          <div className="col-auto">
            <FaUserTie style={{ fontSize: 30, margin: 15 }} />
          </div>
          <div className="col-auto">
            <div className="row boldFontSubHeading">{ctx.facultyCount}</div>
            <div className="row paraTopicBold" style={{ color: "#8c8c8c" }}>
              Number of Faculties
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-auto">
            <FaUsers style={{ fontSize: 35, margin: 13 }} />
          </div>
          <div className="col-auto">
            <div className="row boldFontSubHeading">{ctx.studentCount}</div>
            <div className="row paraTopicBold" style={{ color: "#8c8c8c" }}>
              Number of Students
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBodyStats;
