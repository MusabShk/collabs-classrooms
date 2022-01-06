import { useState, useContext } from "react";
// import { MdEventAvailable } from "react-icons/md";
import AuthUser from "../../store/auth-context";

const AddBranch = (props) => {
  const ctx = useContext(AuthUser);

  const [subjects, setSubjects] = useState([]);
  const [branch, setBranch] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);

  const handleAddSubject = (event) => {
    event.preventDefault();
    setShowSubmit(true);
    const subjectTemplate = {
      name: "",
      faculty: {
        name: "",
        email: "",
        password: "",
      },
      assignments: false,
    };
    setSubjects((prevState) => [...prevState, subjectTemplate]);
  };

  const changeHandler = (index, event) => {
    event.preventDefault();
    event.persist();
    setSubjects((prevState) => {
      return prevState.map((item, i) => {
        // console.log(event.target.name, "ittt");
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,

          // faculty: {
          //   ...item.faculty,
          //   [event.target.name]: event.target.value,
          // },
        };
      });
    });
  };

  const changeHandlerr = (index, event) => {
    event.preventDefault();
    event.persist();
    setSubjects((prevState) => {
      return prevState.map((item, i) => {
        // console.log(event.target.name, "ittt");
        if (i !== index) {
          return item;
        }
        // return {
        //   ...item.faculty,
        //   [event.target.name]: event.target.value,

        //   // ...item.faculty,
        // };

        return {
          ...item,
          faculty: {
            ...item.faculty,
            [event.target.name]: event.target.value,
          },
        };
      });
    });
  };

  const handleRemoveField = (e, index) => {
    e.preventDefault();

    setSubjects((prevState) =>
      prevState.filter((item) => item !== prevState[index])
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(...subjects);
    console.log(branch);
    const bran = {
      name: branch,
      subjects: { ...subjects },
      students: false,
    };
    // console.log(bran, "bb");
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${props.orgId}/branch.json`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bran),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data, "dattttttttttt");
      });
    let facultyData;
    subjects.forEach((subject) => {
      for (let key in subject) {
        if (key === "faculty") {
          facultyData = {
            name: subject[key].name,
            email: subject[key].email,
            organisation: localStorage.getItem("organisation"),
            password: subject[key].password,
            role: 2,
            announcements: false,
          };
          // console.log(subject[key], "keyyyyyyyyyyy");
          console.log(facultyData, "faldata");
        }
      }
    });
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/users.json`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facultyData),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // props.onTrigger();
        ctx.setRefresh(!ctx.refresh);
      });
    // console.log(bran, "bran");
  };

  const branchChangeHandler = (event) => {
    setBranch(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label className="form-label">Branch Name:</label>
        <input
          type="text"
          className="form-control"
          required
          value={branch}
          onChange={branchChangeHandler}
          // onChange={branchChangeHandler}
        />
        {/* <div className="form-text">
          We'll never share your email with anyone else.
        </div> */}
      </div>
      {/* {JSON.stringify(subjects)} */}
      {subjects.map((item, index) => (
        <div key={`item-${index}`}>
          <div className="mb-3">
            <label className="form-label">Subject:</label>
            <input
              type="text"
              className="form-control"
              required
              name="name"
              value={item.name}
              onChange={(e) => changeHandler(index, e)}
            />
          </div>
          <div className="mb-3">
            <div className="form-text">
              <u>Faculty Details:</u>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Faculty Name:</label>
            <input
              type="text"
              className="form-control"
              required
              name="name"
              value={item.faculty.name}
              onChange={(e) => changeHandlerr(index, e)}
              // onChange={branchChangeHandler}
            />
          </div>
          <div className="row g-0">
            <div className="col-sm-6 col-md-6">
              <div className="mb-3">
                <label className="form-label">Email Id:</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  name="email"
                  value={item.faculty.email}
                  onChange={(e) => changeHandlerr(index, e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  name="password"
                  value={item.faculty.password}
                  onChange={(e) => changeHandlerr(index, e)}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <button
              className="btn btn-warning"
              onClick={(e) => handleRemoveField(e, index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="mb-3">
        <div className="row g-2">
          <div className="col-auto">
            <button className="btn btn-primary " onClick={handleAddSubject}>
              Add Subject
            </button>
          </div>
          <div className="col-auto">
            {showSubmit ? (
              <button className="btn btn-primary " type="submit">
                Submit
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddBranch;

//#########################################################

// import React, { useState } from "react";
// // import "./App.css";

// function App() {
//   const [form, setForm] = useState([]);

//   const prevIsValid = () => {
//     if (form.length === 0) {
//       return true;
//     }

//     const someEmpty = form.some(
//       (item) => item.Username === "" || item.Platform === ""
//     );

//     if (someEmpty) {
//       form.map((item, index) => {
//         const allPrev = [...form];

//         if (form[index].Platform === "") {
//           allPrev[index].errors.Platform = "Platform is required";
//         }

//         if (form[index].Username === "") {
//           allPrev[index].errors.Username = "Username is required";
//         }
//         setForm(allPrev);
//       });
//     }

//     return !someEmpty;
//   };

//   const handleAddLink = (e) => {
//     e.preventDefault();
//     const inputState = {
//       Platform: "",
//       Username: "",

//       errors: {
//         Platform: null,
//         Username: null,
//       },
//     };

//     if (prevIsValid()) {
//       setForm((prev) => [...prev, inputState]);
//       const dataaa = {
//         Platform: form.Platform,
//         Username: form.Username,
//       };
//       console.log(dataaa, "hiiiiiiiiiiii");
//     }
//   };

//   const onChange = (index, event) => {
//     event.preventDefault();
//     event.persist();

//     setForm((prev) => {
//       return prev.map((item, i) => {
//         if (i !== index) {
//           return item;
//         }

//         return {
//           ...item,
//           [event.target.name]: event.target.value,

//           errors: {
//             ...item.errors,
//             [event.target.name]:
//               event.target.value.length > 0
//                 ? null
//                 : [event.target.name] + " Is required",
//           },
//         };
//       });
//     });
//   };

//   const handleRemoveField = (e, index) => {
//     e.preventDefault();

//     setForm((prev) => prev.filter((item) => item !== prev[index]));
//   };
//   return (
//     <div className="container mt-5 py-5">
//       <h1>Add Social Links</h1>
//       <p>Add links to sites you want to share with your viewers</p>

//       {JSON.stringify(form)}

//       <form>
//         {form.map((item, index) => (
//           <div className="row mt-3" key={`item-${index}`}>
//             <div className="col">
//               <input
//                 type="text"
//                 className={
//                   item.errors.Platform
//                     ? "form-control  is-invalid"
//                     : "form-control"
//                 }
//                 name="Platform"
//                 placeholder="Platform"
//                 value={item.Platform}
//                 onChange={(e) => onChange(index, e)}
//               />

//               {item.errors.Platform && (
//                 <div className="invalid-feedback">{item.errors.Platform}</div>
//               )}
//             </div>

//             <div className="col">
//               <input
//                 type="text"
//                 className={
//                   item.errors.Username
//                     ? "form-control  is-invalid"
//                     : "form-control"
//                 }
//                 name="Username"
//                 placeholder="Username"
//                 value={item.Username}
//                 onChange={(e) => onChange(index, e)}
//               />

//               {item.errors.Username && (
//                 <div className="invalid-feedback">{item.errors.Username}</div>
//               )}
//             </div>

//             <button
//               className="btn btn-warning"
//               onClick={(e) => handleRemoveField(e, index)}
//             >
//               X
//             </button>
//           </div>
//         ))}

//         <button className="btn btn-primary mt-2" onClick={handleAddLink}>
//           Add a link
//         </button>
//       </form>
//     </div>
//   );
// }

// export default App;
