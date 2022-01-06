import { RiUserSettingsFill } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { FaUserTie, FaUsers } from "react-icons/fa";

const Announcements = (props) => {
  const deleteAnnouncement = (id) => {
    if (localStorage.getItem("loggedIn") === "guest") {
      return toast.warn("Guest users do not have such action rights", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    props.setAnnouncementSpinner(true);
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements/${id}.json`,
      {
        method: "DELETE", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        props.newFetchForAnnouncements();
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          console.log(err);
          // setError(err);
        }
      });
  };

  return (
    <div className="card">
      <ToastContainer />
      <div
        className="card-header boldFontSubHeading  text-white"
        style={{ backgroundColor: "#BB0000" }}
      >
        Announcements
      </div>
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        <div className="card-text subheadingTopic">
          {props.allAnnouncements.hodAnnouncements.length === 0 &&
          props.allAnnouncements.mineAnnouncements.length === 0 ? (
            <p className="paraTopic ">No Announcements &nbsp; :(</p>
          ) : (
            <></>
          )}
        </div>
        <div className="card-text">
          {props.allAnnouncements.hodAnnouncements.length !== 0 ? (
            <>
              <div className="btn-group dropend">
                <button
                  type="button"
                  className="btn btn-white dropdown-toggle paraTopic"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <RiUserSettingsFill
                    style={{ fontSize: 20, color: "black" }}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hod
                </button>
                <div
                  className="dropdown-menu p-4 text-muted paraTopic"
                  style={{ maxWidth: 250 }}
                >
                  {props.allAnnouncements.hodAnnouncements.map(
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
        <div className="card-text">
          {props.allAnnouncements.mineAnnouncements.length !== 0 ? (
            <>
              <div className=" btn-group dropend">
                <button
                  type="button"
                  className="btn btn-white dropdown-toggle paraTopic"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserTie style={{ fontSize: 18, color: "black" }} />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (My)
                </button>
                <div
                  className="dropdown-menu p-4 text-muted paraTopic"
                  style={{ maxWidth: 250 }}
                >
                  {props.allAnnouncements.mineAnnouncements.map(
                    (announcement, index) => (
                      <p key={index}>
                        {announcement.text}
                        <button
                          type="button"
                          className="btn"
                          onClick={() => deleteAnnouncement(announcement.id)}
                        >
                          <MdDelete style={{ color: "red" }} />
                        </button>
                      </p>
                    )
                  )}
                </div>
                {/* <ul className="dropdown-menu ">
                  {props.allAnnouncements.mineAnnouncements.map(
                    (announcement, index) => (
                     
                      //   <li className="dropdown-item">
                      //     <div className="row">
                      //       <div className="col-auto">
                      //         {announcement.text}
                      //         qqqqqqqqqqqqqqqqqqqqzzzzzzzzzzzzzzz
                      //       </div>
                      //       <div className="col-auto">aef</div>
                      //     </div>
                      //   </li>
                      //   <li className="dropdown-item w-70" key={index}>
                      //     {announcement.text}
                      //     qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
                      //   </li>
                      //   <div  key={index}>
                      //    <li className="dropdown-item">
                      //
                      //        </li>
                      //     <div className="col-auto">
                      //       <li className="p-3 ">
                      //         {announcement.text}
                      //         qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
                      //       </li>
                      //     </div>
                      //     <div className="col-auto">
                      //       <li className="p-3">...</li>
                      //     </div>
                      //   </div>
                    )
                  )}
                </ul> */}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        {/* <table className="table table-borderless">
            <tbody>
              <tr>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table> */}
      </div>
    </div>
  );
};

export default Announcements;
