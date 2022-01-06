import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";

const OrganisationHod = (props) => {
  // console.log(props);
  const [showSubmit, setShowSubmit] = useState(false);
  const [hodDetails, setHodDetails] = useState({
    name: props.hod.name,
    email: props.hod.email,
    password: props.hod.password,
  });

  const nameChangeHandler = (event) => {
    setShowSubmit(true);
    setHodDetails((prevState) => {
      return { ...prevState, name: event.target.value };
    });
  };

  const emailChangeHandler = (event) => {
    setShowSubmit(true);

    setHodDetails((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };

  const passwordChangeHandler = (event) => {
    setShowSubmit(true);

    setHodDetails((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${props.id}/hod.json`,
      {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hodDetails),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log({ data });
      });
    // console.log(hodDetails);
    setShowSubmit(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <h5>
        <input
          type="text"
          className="form-control-plaintext text-center"
          value={hodDetails.name}
          onChange={nameChangeHandler}
          required
        />
      </h5>

      <input
        type="email"
        className="form-control-plaintext text-center"
        value={hodDetails.email}
        onChange={emailChangeHandler}
        required
      />

      <input
        type="text"
        className="col-auto form-control-plaintext text-center"
        value={hodDetails.password}
        onChange={passwordChangeHandler}
        required
      />
      {showSubmit ? (
        <div className="p-3 row">
          <button
            type="submit"
            className="btn text-white"
            style={{ backgroundColor: "darkblue" }}
          >
            Save Changes
          </button>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

export default OrganisationHod;
