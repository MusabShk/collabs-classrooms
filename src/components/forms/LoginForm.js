import { useContext, useRef, useState } from "react";
import Alert from "../alert/Alert";
import Spinner from "../spinner/Spinner";
import { BrowserRouter, useHistory } from "react-router-dom";
import AuthUser from "../../store/auth-context";

const LoginForm = () => {
  const ctx = useContext(AuthUser);
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [switchTextPassword, setSwitchTextPassword] = useState("password");
  const [email, setEmail] = useState({
    emailLabel: true,
    validEmail: true,
    enteredEmail: "",
    incorrectEmail: "",
  });
  const [password, setPassword] = useState({
    passwordLabel: true,
    validPassword: true,
    enteredPassword: "",
    incorrectPassword: "",
  });

  const emailChangeHandler = (event) => {
    // setPassword((prevState) => {
    //   return { ...prevState, incorrectPassword: "" };
    // });
    setEmail((prevState) => {
      return {
        ...prevState,
        validEmail: true,
        enteredEmail: event.target.value,
        // incorrectEmail: "",
      };
    });
  };
  const passwordChangeHandler = (event) => {
    // setEmail((prevState) => {
    //   return { ...prevState, incorrectEmail: "" };
    // });
    setPassword((prevState) => {
      return {
        ...prevState,
        validPassword: true,
        enteredPassword: event.target.value,
        // incorrectPassword: "",
      };
    });
  };
  const validateEmail = () => {
    if (email.enteredEmail.length > 0) {
      setEmail((prevState) => {
        return { ...prevState, validEmail: true };
      });
    } else {
      setEmail((prevState) => {
        return { ...prevState, validEmail: false };
      });
    }
  };
  const validatePassword = () => {
    if (password.enteredPassword.length > 0) {
      setPassword((prevState) => {
        return { ...prevState, validPassword: true };
      });
    } else {
      setPassword((prevState) => {
        return { ...prevState, validPassword: false };
      });
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    // if (email.enteredEmail.length == 0) {
    //   setEmail((prevState) => {
    //     return { ...prevState, validEmail: false };
    //   });
    //   emailFocus.current.focus();
    // }
    setLoading(true);
    fetch("https://crm-management-6790c-default-rtdb.firebaseio.com/users.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data, "log");
        const users = [];
        for (const key in data) {
          users.push({
            id: key,
            name: data[key].name,
            email: data[key].email,
            password: data[key].password,
            role: data[key].role,
            organisation: data[key].organisation,
            announcements: data[key].announcements,
            branch: data[key].branch,
            subject: data[key].subject,
            rollnumber: data[key].rollnumber,
          });
        }
        // console.log(dataa, "logg");

        let user = users.find((x) => x.email === email.enteredEmail);
        if (
          user != undefined &&
          user.email === email.enteredEmail &&
          user.password === password.enteredPassword
        ) {
          // localStorage.setItem("loggedInCrm", true);
          // localStorage.setItem("role", user.role);
          // setShowAlert(false);
          // console.log("success");
          // setEmail((prevState) => {
          //   return { ...prevState, enteredEmail: "" };
          // });
          // setPassword((prevState) => {
          //   return { ...prevState, enteredPassword: "" };
          // });

          switch (user.role) {
            case 0:
              localStorage.setItem("loggedIn", "adm1");
              history.push("/admin/dashboard");
              break;
            case 1:
              localStorage.setItem("loggedIn", "hod21");
              localStorage.setItem("organisation", user.organisation);
              localStorage.setItem("role", user.role);
              history.push(
                `/${localStorage.getItem("organisation")}/hod/dashboard`
              );
              break;
            case 2:
              localStorage.setItem("loggedIn", "78tech");
              localStorage.setItem("organisation", user.organisation);
              localStorage.setItem("role", user.role);
              localStorage.setItem("branch", user.branch);
              localStorage.setItem("subject", user.subject);

              ctx.setUserData(user);
              history.push(
                `/${localStorage.getItem("organisation")}/teacher/dashboard`
              );
              break;
            case 3:
              localStorage.setItem("loggedIn", "stud00");
              localStorage.setItem("organisation", user.organisation);
              localStorage.setItem("branch", user.branch);
              localStorage.setItem("role", user.role);
              localStorage.setItem("rollnumber", user.rollnumber);
              history.push(
                `/${localStorage.getItem(
                  "organisation"
                )}/student/events&announcements`
              );
              break;
            case 4:
              localStorage.setItem("loggedIn", "guest");
              localStorage.setItem("role", user.role);
              history.push("/admin/dashboard");
              break;
            case 4.1:
              localStorage.setItem("loggedIn", "guest");
              localStorage.setItem("organisation", user.organisation);
              localStorage.setItem("role", user.role);
              history.push(
                `/${localStorage.getItem("organisation")}/hod/dashboard`
              );
              break;
            case 4.2:
              localStorage.setItem("loggedIn", "guest");
              localStorage.setItem("organisation", user.organisation);
              localStorage.setItem("role", user.role);
              localStorage.setItem("branch", user.branch);
              localStorage.setItem("subject", user.subject);

              ctx.setUserData(user);
              history.push(
                `/${localStorage.getItem("organisation")}/teacher/dashboard`
              );
              break;
            case 4.3:
              localStorage.setItem("loggedIn", "guest");
              localStorage.setItem("organisation", user.organisation);
              localStorage.setItem("branch", user.branch);
              localStorage.setItem("role", user.role);
              localStorage.setItem("rollnumber", user.rollnumber);
              history.push(
                `/${localStorage.getItem(
                  "organisation"
                )}/student/events&announcements`
              );
          }
          localStorage.setItem("crmUserName", user.name);
          // ctx.UserData = user;
          // history.push("/admin/dashboard");
        } else {
          setShowAlert(true);
          setLoading(false);
          // console.log("fail");
        }

        // setPassword((prevState) => {
        //   return { ...prevState, incorrectPassword: "" };
        // });
        // setEmail((prevState) => {
        //   return { ...prevState, incorrectEmail: "" };
        // });
        // (function () {
        //   //   console.log("lwlwlw");
        //   users.forEach((user) => {
        //     for (let key in user) {
        //       //   console.log(user);
        //       if (key === "email" && user[key] === email.enteredEmail) {
        //         setEmail((prevState) => {
        //           return { ...prevState, incorrectEmail: "false" };
        //         });
        //         console.log("1");
        //       }
        //       if (
        //         key === "password" &&
        //         user[key] === password.enteredPassword
        //       ) {
        //         setPassword((prevState) => {
        //           return { ...prevState, incorrectPassword: "false" };
        //         });
        //         console.log("2");
        //       }
        //       //   console.log("andar");
        //       if (
        //         email.incorrectEmail === "false" &&
        //         password.incorrectPassword === "false"
        //       ) {
        //         return;
        //       }
        //     }
        //   });
        // })();
      });
  };
  const toggle = () => {
    if (switchTextPassword === "text") {
      setSwitchTextPassword("password");
    } else {
      setSwitchTextPassword("text");
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label"
            style={{ color: email.validEmail ? "" : "red" }}
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={emailChangeHandler}
            onBlur={validateEmail}
            required
            value={email.enteredEmail}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label"
            style={{ color: password.validPassword ? "" : "red" }}
          >
            Password
          </label>
          <input
            type={switchTextPassword}
            className="form-control"
            id="exampleInputPassword1"
            onChange={passwordChangeHandler}
            onBlur={validatePassword}
            required
            value={password.enteredPassword}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onClick={toggle}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Show password
          </label>
        </div>
        <div className="p-3 row">
          {showAlert ? (
            <div className="p-3 text-center">
              <Alert message={"Incorrect email or password"} />
            </div>
          ) : (
            <></>
          )}
          {loading ? (
            <div className="p-3 text-center">
              <Spinner />
            </div>
          ) : (
            <button
              type="submit"
              className="btn text-white subheadingTopic"
              style={{ backgroundColor: "darkblue" }}
            >
              Login
            </button>
          )}
        </div>
        <div className="p-3 text-center">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Don't have an account ?&nbsp;&nbsp;
          </label>
          <div className="btn-group">
            <button
              className="btn btn-white btn-sm dropdown-toggle border-white"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Guest Login
            </button>
            <ul className="dropdown-menu">
              <li
                className="dropdown-item"
                onClick={() => {
                  setEmail((prevState) => {
                    return {
                      ...prevState,
                      enteredEmail: "musabshaikhguest@gmail.com",
                      validEmail: true,
                    };
                  });
                  setPassword((prevState) => {
                    return {
                      ...prevState,
                      enteredPassword: "musabguest",
                      validPassword: true,
                    };
                  });
                }}
              >
                Manager
              </li>
              <li
                className="dropdown-item"
                onClick={() => {
                  setEmail((prevState) => {
                    return {
                      ...prevState,
                      enteredEmail: "simon@gmail.com",
                      validEmail: true,
                    };
                  });
                  setPassword((prevState) => {
                    return {
                      ...prevState,
                      enteredPassword: "simon123",
                      validPassword: true,
                    };
                  });
                }}
              >
                Dean
              </li>
              <li
                className="dropdown-item"
                onClick={() => {
                  setEmail((prevState) => {
                    return {
                      ...prevState,
                      enteredEmail: "zeel@gmail.com",
                      validEmail: true,
                    };
                  });
                  setPassword((prevState) => {
                    return {
                      ...prevState,
                      enteredPassword: "zeel123",
                      validPassword: true,
                    };
                  });
                }}
              >
                Faculty
              </li>
              <li
                className="dropdown-item"
                onClick={() => {
                  setEmail((prevState) => {
                    return {
                      ...prevState,
                      enteredEmail: "adam@gmail.com",
                      validEmail: true,
                    };
                  });
                  setPassword((prevState) => {
                    return {
                      ...prevState,
                      enteredPassword: "adam123",
                      validPassword: true,
                    };
                  });
                }}
              >
                Student
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
