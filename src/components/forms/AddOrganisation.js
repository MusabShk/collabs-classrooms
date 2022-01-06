import { useState, useRef, useContext } from "react";
import Spinner from "../spinner/Spinner";
import AuthUser from "../../store/auth-context";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddOrganisation = () => {
  const ctx = useContext(AuthUser);
  const [showSpin, setShowSpin] = useState(false);
  const [showPassword, setShowPassword] = useState({
    toggle: false,
    state: "password",
  });
  const [organisation, setOrganisation] = useState({
    name: "",
    type: "",
    hod: {
      name: "",
      email: "",
      password: "",
    },
    branch: false,
    // subjects: false,
  });

  const orgNameChangeHandler = (event) => {
    setShowClear(true);
    setOrganisation((prevState) => {
      return { ...prevState, name: event.target.value };
    });
  };

  const typeChangeHandler = (event) => {
    setShowClear(true);

    setOrganisation((prevState) => {
      return { ...prevState, type: event.target.value };
    });
  };

  const hodNameChangeHandler = (event) => {
    setShowClear(true);

    setOrganisation((prevState) => {
      return {
        ...prevState,
        hod: { ...prevState.hod, name: event.target.value },
      };
    });
  };

  const hodEmailChangeHandler = (event) => {
    setShowClear(true);

    setOrganisation((prevState) => {
      return {
        ...prevState,
        hod: { ...prevState.hod, email: event.target.value },
      };
    });
  };

  const hodPasswordChangeHandler = (event) => {
    setShowClear(true);

    setOrganisation((prevState) => {
      return {
        ...prevState,
        hod: { ...prevState.hod, password: event.target.value },
      };
    });
  };

  const onSubmitHandler = (event) => {
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
    setShowClear(false);
    setShowSpin(true);
    fetch(
      "https://crm-management-6790c-default-rtdb.firebaseio.com/organisation.json",
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organisation),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data, "dataa");
      });
    const hodData = {
      name: organisation.hod.name,
      email: organisation.hod.email,
      password: organisation.hod.password,
      organisation: organisation.name,
      role: 1,
      announcements: false,
    };
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/users.json`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hodData),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setOrganisation((prevState) => {
          return {
            ...prevState,
            name: "",
            type: "",
            hod: {
              name: "",
              email: "",
              password: "",
            },
            branch: false,
          };
        });
        setShowSpin(false);
        ctx.setRefresh(!ctx.refresh);
      });
  };

  const showPasswordChangeHandler = () => {
    // event.preventDefault();
    if (showPassword.state === "password") {
      return setShowPassword((prevState) => {
        return { ...prevState, toggle: !showPassword.toggle, state: "text" };
      });
    }
    setShowPassword((prevState) => {
      return { ...prevState, toggle: !showPassword.toggle, state: "password" };
    });
  };

  const [showClear, setShowClear] = useState(false);

  const clearFieldsHandler = () => {
    setOrganisation((prevState) => {
      return {
        ...prevState,
        name: "",
        type: "",
        hod: {
          name: "",
          email: "",
          password: "",
        },
        branch: false,
      };
    });
    setShowClear(false);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="mb-3">
        <label className="form-label">Organisation Name: </label>
        <input
          value={organisation.name}
          type="text"
          className="form-control"
          required
          onChange={orgNameChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Type: </label>
        <input
          value={organisation.type}
          type="text"
          className="form-control"
          required
          onChange={typeChangeHandler}
        />
      </div>
      <div className="mb-3">
        <h4>
          <span className="badge bg-dark text-white paraTopicBold">
            HOD detail:
          </span>
        </h4>
        <label className="form-label">Name: </label>
        <input
          value={organisation.hod.name}
          type="text"
          className="form-control"
          required
          onChange={hodNameChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email: </label>
        <input
          value={organisation.hod.email}
          type="email"
          className="form-control"
          required
          onChange={hodEmailChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password: </label>
      </div>
      <div className="input-group mb-3">
        {/* <label className="form-label">Password: </label> */}

        <input
          value={organisation.hod.password}
          type={showPassword.state}
          className="form-control"
          required
          onChange={hodPasswordChangeHandler}
        />
        {/* <button className="btn btn-outline-dark" type="button">
          {showPassword.toggle ? (
            <AiFillEyeInvisible onClick={showPasswordChangeHandler} />
          ) : (
            <AiFillEye onClick={showPasswordChangeHandler} />
          )}
        </button> */}
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
          onClick={showPasswordChangeHandler}
        />
        <label className="form-check-label">Show password</label>
      </div>
      {showSpin ? (
        <div className="row justify-content-center">
          <Spinner />
        </div>
      ) : (
        <div className="mb-3 d-grid">
          <button
            type="submit"
            className=" btn text-white"
            style={{ backgroundColor: "darkblue" }}
          >
            Submit
          </button>
        </div>
      )}

      {showClear ? (
        <div className="mb-3 d-grid">
          <button
            type="button"
            className=" btn btn-white"
            style={{
              color: "darkblue",
            }}
            onClick={clearFieldsHandler}
          >
            Clear
          </button>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

export default AddOrganisation;
