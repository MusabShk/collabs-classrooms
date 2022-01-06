import { React, useRef, useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Spinner from "../spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DashboardBodyEvent = (props) => {
  const [loading, setLoading] = useState(false);
  const [sig, setSig] = useState();
  const dateFocus = useRef();
  const [showButtons, setShowButtons] = useState(false);
  const [d, setD] = useState(new Date());
  const [announcement, setAnnouncement] = useState({
    date: "",
    text: "",
  });
  const dateChange = (d) => {
    // setDate(date);
    let date = d.getDate();
    let month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    let year = d.getFullYear();

    let dateStr = date + "/" + month + "/" + year;
    // setD(dateStr);
    setAnnouncement((prevState) => {
      return { ...prevState, date: dateStr };
    });
    setShowButtons(true);
    // console.log(dateStr);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setSig(signal);
    return () => controller.abort();
  }, []);

  const textChangeHandler = (event) => {
    setShowButtons(true);

    setAnnouncement((prevState) => {
      return { ...prevState, text: event.target.value };
    });
  };
  const clearDataHandler = () => {
    setShowButtons(false);
    setAnnouncement((prevState) => {
      return {
        ...prevState,
        date: "",
        text: "",
      };
    });
    setD(new Date());
  };

  const submitHandler = (event) => {
    event.preventDefault();
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

    setShowButtons(false);
    setLoading(true);
    let announce = {
      text: announcement.date.concat(" ", announcement.text.trim()),
      role: 1,
      organisation: localStorage.getItem("organisation"),
      event: true,
    };
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/announcements.json`,
      {
        signal: sig,
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(announce),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        props.setRefreshEvents(!props.refreshEvents);
        setAnnouncement((prevState) => {
          return {
            ...prevState,
            date: "",
            text: "",
          };
        });
        setLoading(false);
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
      <div
        className="shadow p-3 mb-5 rounded"
        style={{ backgroundColor: "#EDF4FF" }}
      >
        <div className="row " style={{ paddingBottom: 30 }}>
          <h3 className="col-auto boldFontSubHeading text-dark">
            Add an Event Announcement
          </h3>
        </div>

        <div
          className="row justify-content-center"
          style={{ paddingBottom: 30 }}
        >
          <Calendar onChange={dateChange} value={d} />
        </div>
        <div className="row">
          <form className="paraTopic text-dark" onSubmit={submitHandler}>
            <fieldset disabled>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  ref={dateFocus}
                  required
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Please select a Date"
                  value={announcement.date}
                  readOnly
                />
              </div>
            </fieldset>
            <div className="mb-3">
              <label className="form-label">Anouncement</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Add your announcement"
                id="floatingTextarea2"
                value={announcement.text}
                onChange={textChangeHandler}
              />
            </div>
            {loading ? (
              <div className="p-3 row justify-content-center">
                <Spinner />
              </div>
            ) : (
              <></>
            )}

            {showButtons ? (
              <div className="row justify-content-start">
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-link paraTopic"
                    style={{
                      // borderColor: "darkblue",
                      // backgroundColor: "white",
                      color: "darkblue",
                    }}
                    onClick={clearDataHandler}
                  >
                    Clear
                  </button>
                </div>

                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn text-white border-none paraTopic"
                    style={{
                      backgroundColor: "darkblue",
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default DashboardBodyEvent;
