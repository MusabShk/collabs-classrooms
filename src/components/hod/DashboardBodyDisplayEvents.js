import { React, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import Spinner from "../spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DashboardBodyDisplayEvents = (props) => {
  const [loading, setLoading] = useState(true);
  const [sig, setSig] = useState();
  const [eventAnnouncements, setEventAnnouncements] = useState();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setSig(signal);
    setLoading(true);
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements.json`,
      { signal: signal }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let allAnnouncements = [];
        for (const key in data) {
          allAnnouncements.push({
            id: key,
            role: data[key].role,
            text: data[key].text,
            organisation: data[key].organisation,
            event: data[key].event,
          });
        }
        setEventAnnouncements(
          allAnnouncements.filter((obj) => {
            return (
              obj.role === 1 &&
              obj.event === true &&
              obj.organisation === localStorage.getItem("organisation")
            );
          })
        );

        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          // setError(err);
          console.log(err);
        }
      });
    return () => controller.abort();
  }, [props.refreshEvents]);

  const deleteHandler = (announcement) => {
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
    setLoading(true);
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements/${announcement.id}.json`,
      {
        signal: sig,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        props.setRefreshEvents(!props.refreshEvents);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          // setError(err);
          console.log(err);
        }
      });
  };

  return (
    <>
      <ToastContainer />
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
        {loading ? (
          <div className="p-3 row justify-content-center">
            <Spinner />
          </div>
        ) : (
          <>
            {eventAnnouncements.length !== 0 ? (
              <>
                {eventAnnouncements.map((announcement, index) => (
                  <div
                    className="shadow-sm p-4 mb-4 bg-body rounded paraTopic"
                    key={index}
                  >
                    <div className="row justify-content-between">
                      <div className="col-8">
                        <HiSpeakerphone
                          className="text-primary"
                          style={{
                            marginRight: 15,
                            fontSize: 20,
                          }}
                        />
                        {announcement.text}
                      </div>
                      <div className="col-auto">
                        <MdDelete
                          onClick={() => deleteHandler(announcement)}
                          style={{
                            fontSize: 20,
                            color: "black",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
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

                <div
                  className="row paraTopic text-center"
                  style={{ paddingTop: 20 }}
                >
                  <div>
                    Use Add an Event Announcement block window to create a new
                    one.
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DashboardBodyDisplayEvents;
