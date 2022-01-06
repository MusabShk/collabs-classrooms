import React from "react";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";

const DashboardSubjectAnnouncements = (props) => {
  return (
    <div className="card">
      <div
        className="card-header boldFontSubHeading text-white"
        style={{ backgroundColor: "#BB0000" }}
      >
        Announcements
      </div>
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        <div className="card-text subheadingTopic">
          {props.allAnnouncements.teacherAnnouncements.length === 0 ? (
            <p className="paraTopic ">No Announcements &nbsp; :(</p>
          ) : (
            <></>
          )}
        </div>

        <div className="card-text">
          {props.allAnnouncements.teacherAnnouncements.length !== 0 ? (
            <>
              <div className=" btn-group">
                <button
                  type="button"
                  className="btn btn-white dropdown-toggle paraTopic"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserTie style={{ fontSize: 18, color: "black" }} />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Faculty
                </button>
                <div
                  className="dropdown-menu p-4 text-muted paraTopic"
                  style={{ maxWidth: 250 }}
                >
                  {props.allAnnouncements.teacherAnnouncements.map(
                    (announcement, index) => (
                      <p key={index}>{announcement.text}</p>
                    )
                  )}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSubjectAnnouncements;
