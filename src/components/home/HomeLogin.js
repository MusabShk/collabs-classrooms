import "./HomeLogin.css";
import LoginForm from "../forms/LoginForm";

const HomeLogin = () => {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img src="/homepage.png" className="img-fluid" alt="..." />
        </div>
        <div className="col-md-6">
          <div className="shadow p-3 mb-5 bg-body rounded">
            <div className="row">
              <p className="sub-heading paraTopic">Already a member ?</p>
            </div>
            <div className="row">
              <p className="headingTopic">Log In </p>
            </div>
            <div className="row paraTopic">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLogin;
