import React from "react";
import { MdAnnouncement } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";

import { MdDelete } from "react-icons/md";
const DashboardAnnouncements = (props) => {
  return (
    <div className="shadow p-3 mb-5 bg-body rounded">
      <div className="row " style={{ paddingBottom: 30 }}>
        <div className="col-auto boldFontSubHeading text-dark">
          <h3>
            <span className="badge" style={{ backgroundColor: "#BB0000" }}>
              Events and Announcements
            </span>
          </h3>
        </div>
      </div>
      {props.allAnnouncements.hodAnnouncements.length === 0 &&
      props.allAnnouncements.teacherAnnouncements.length === 0 ? (
        <>
          <div className="row justify-content-center">
            <img
              src="/noeventannouncement.png"
              className="card-img"
              alt="..."
              style={{ width: 500 }}
            />
          </div>
          <div className="row justify-content-center boldFontSubHeading ">
            No Event Announcements here !
          </div>
        </>
      ) : (
        <>
          {props.allAnnouncements.hodAnnouncements.map(
            (announcement, index) => (
              <div className="shadow-sm p-4 mb-4 bg-body rounded " key={index}>
                <div className="row justify-content-between">
                  <div className="col-8 paraTopic">
                    <HiSpeakerphone
                      className="text-primary"
                      style={{
                        marginRight: 15,
                        fontSize: 20,
                      }}
                    />
                    {announcement.text}
                  </div>
                  <div className="col-auto paraTopicBold">
                    <span className="badge bg-black">HOD</span>
                  </div>
                </div>
              </div>
            )
          )}
          {/* {props.allAnnouncements.teacherAnnouncements.map(
            (announcement, index) => (
              <div className="shadow-sm p-4 mb-4 bg-body rounded " key={index}>
                <div className="row justify-content-between">
                  <div className="col-6 paraTopic">
                    <HiSpeakerphone
                      className="text-primary"
                      style={{
                        marginRight: 15,
                        fontSize: 20,
                      }}
                    />
                    {announcement.text}
                  </div>
                  <div className="col-auto paraTopicBold">
                    <span className="badge bg-light paraTopicBold">
                      Subject: &nbsp;
                      {announcement.subject}
                    </span>
                  </div>
                </div>
              </div>
            )
          )} */}
        </>
      )}
    </div>
    //   {loading ? (
    //     <div className="p-3 row justify-content-center">
    //       <Spinner />
    //     </div>
    //   ) : (
    //     <>
    //       {eventAnnouncements.length !== 0 ? (
    //         <>
    //           {eventAnnouncements.map((announcement, index) => (
    //             <div className="shadow-sm p-4 mb-4 bg-body rounded" key={index}>
    //               <div className="row justify-content-between">
    //                 <div className="col-8">
    //                   <HiSpeakerphone
    //                     className="text-primary"
    //                     style={{
    //                       marginRight: 15,
    //                       fontSize: 20,
    //                     }}
    //                   />
    //                   {announcement.text}
    //                 </div>
    //                 <div className="col-auto">
    //                   <MdDelete
    //                     onClick={() => deleteHandler(announcement)}
    //                     style={{
    //                       fontSize: 20,
    //                       color: "black",
    //                     }}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </>
    //       ) : (
    //         <>
    //           <div className="row justify-content-center">
    //             <img
    //               src="/noeventannouncement.png"
    //               className="card-img"
    //               alt="..."
    //               style={{ width: 500 }}
    //             />
    //           </div>
    //           <div className="row justify-content-center boldFontSubHeading ">
    //             No Event Announcements here !
    //           </div>

    //           <div
    //             className="row paraTopic text-center"
    //             style={{ paddingTop: 20 }}
    //           >
    //             <div>
    //               Use Add an Event Announcement block window to create a new
    //               one.
    //             </div>
    //           </div>
    //         </>
    //       )}
    //     </>
    //   )}
    // </div>
  );
};

export default DashboardAnnouncements;
