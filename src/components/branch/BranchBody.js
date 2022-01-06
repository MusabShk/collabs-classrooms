import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import AuthUser from "../../store/auth-context";
import { useContext } from "react";
import CardRow2 from "../card/CardRow2";
import SubjectsTab from "./SubjectsTab";
import PeopleTab from "./PeopleTab";

// import "./BBNavbar.css";

const BranchBody = (props) => {
  const ctx = useContext(AuthUser);
  // const [again, setAgain] = useState(true);
  // const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  // const [branchData, setBranchData] = useState();
  const params = useParams();
  // console.log(params.branch, "params");

  // useEffect(() => {
  //   // setLoading(true);
  //   fetch(
  //     `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${ctx.dataOrganisation.id}/branch.json`
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data, "dt");
  //       const branches = [];
  //       for (const key in data) {
  //         branches.push({
  //           id: key,
  //           ...data[key],
  //         });
  //       }
  //       // ctx.setDataBranch(branches.find((o) => o.name === params.branch));
  //       ctx.setBranches(branches);
  //       let dataBranch = branches.find((o) => o.name === params.branch);
  //       const subjects = [];
  //       for (const key in dataBranch.subjects) {
  //         subjects.push({
  //           id: key,
  //           ...dataBranch.subjects[key],
  //         });
  //       }
  //       ctx.setDataSubjects(subjects);
  //       ctx.setDataBranch(branches.find((o) => o.name === params.branch));
  //       setLoading(false);
  //       //   setAgain((prevState) => !prevState);
  //       //   // props.setRefresh();
  //       // });
  //     });
  // }, [refresh, params.branch]);

  // useEffect(() => {
  //   // setLoading(true)
  //   // console.log("hq1");
  //   let dataBranch = ctx.branches.find((o) => o.name === params.branch);
  //   console.log(dataBranch, "databranch");
  //   const subjects = [];
  //   for (const key in dataBranch.subjects) {
  //     subjects.push({
  //       id: key,
  //       ...dataBranch.subjects[key],
  //     });
  //   }
  //   // console.log(subjects, "m22");
  //   // console.log(
  //   //   ctx.branches.find((o) => o.name === params.branch),
  //   //   "m33"
  //   // );
  //   ctx.setDataSubjects(subjects);
  //   ctx.setDataBranch(ctx.branches.find((o) => o.name === params.branch));
  //   setLoading(false);

  //   // console.log(dataa, "logg");

  //   // let user = users.find((x) => x.email === email.enteredEmail);
  //   // console.log(user, "mm");
  // }, [params.branch, again]);
  // console.log(branchData);

  // console.log(ctx.branches, "m1");
  // console.log(ctx.dataBranch, "m2");
  // console.log(ctx.dataSubjects, "m3");

  const refreshHandler = () => {
    props.setRefresh();
  };

  return (
    <div>
      {/* {loading ? (
        <div className="row  justify-content-center">
          <Spinner />
        </div>
      ) : (
        <> */}
      <div className="row">
        <span className="headingTopic">
          {localStorage.getItem("organisation")}
        </span>
      </div>

      <div className="row">
        <div className="shadow p-3 mb-5 bg-body rounded">
          <div className="row justify-content-between">
            <div className="col-auto boldFontSubHeading">
              <h3>
                <span className="badge" style={{ backgroundColor: "#BB0000" }}>
                  Branch Structure
                </span>
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-auto" style={{ marginTop: 3, marginRight: 10 }}>
              <h6>
                <span className="badge alert-primary rounded-pill ">
                  {localStorage.getItem("branchname")}
                </span>
              </h6>
            </div>
          </div>
          <ul
            className="nav nav-pills mb-3 justify-content-center subheadingTopic"
            id="pills-tab"
            role="tablist "
            style={{ marginTop: 40 }}
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-subjects-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-subjects"
                type="button"
                role="tab"
                aria-controls="pills-subjects"
                aria-selected="true"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Subjects&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-people-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-people"
                type="button"
                role="tab"
                aria-controls="pills-people"
                aria-selected="false"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;People&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </li>
          </ul>
          <div className="tab-content row" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-subjects"
              role="tabpanel"
              aria-labelledby="pills-subjects-tab"
            >
              <SubjectsTab />
            </div>
            <div
              className="tab-pane fade"
              id="pills-people"
              role="tabpanel"
              aria-labelledby="pills-people-tab"
            >
              <PeopleTab />
            </div>
          </div>
        </div>
      </div>
      {/* </>
      )} */}
    </div>
  );
};

export default BranchBody;
