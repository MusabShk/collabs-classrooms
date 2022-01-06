import React from "react";

const DashboardBodyNoBranch = (props) => {
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
        <div
          className="row justify-content-center boldFontSubHeading"
          style={{ paddingTop: 40 }}
        >
          No Branch here !
        </div>

        <div className="row paraTopic text-center" style={{ paddingTop: 20 }}>
          <div>
            You can
            <span className="text-primary" onClick={() => props.refButton()}>
              {" "}
              Add a Branch{" "}
            </span>
            by clicking the Plus icon on the right corner.
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBodyNoBranch;
