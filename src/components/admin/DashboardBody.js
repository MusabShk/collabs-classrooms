import { useEffect, useState, useRef, useContext } from "react";
import Card from "../card/Card";
import Spinner from "../spinner/Spinner";
import "./Dashboard.css";
import { Doughnut } from "react-chartjs-2";
import AddOrganisation from "../forms/AddOrganisation";
import { TiPlus } from "react-icons/ti";
import AuthUser from "../../store/auth-context";

const DashboardBody = () => {
  const [showSpin, setShowSpin] = useState(false);
  const ctx = useContext(AuthUser);
  const [refresh, setRefresh] = useState(true);
  const triggerClose = useRef();
  const [loading, setLoading] = useState(true);
  const [organisationData, setOrganisationData] = useState(false);
  const [organisation, setOrganisation] = useState({
    type: false,
    count: false,
  });
  useEffect(() => {
    setShowSpin(true);
    fetch(
      "https://crm-management-6790c-default-rtdb.firebaseio.com/organisation.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data != null) {
          // console.log(data, "1");
          const organisation = [];
          for (const key in data) {
            organisation.push({
              id: key,
              name: data[key].name,
              type: data[key].type,
            });
          }
          // console.log(organisation, "hai kya");
          setOrganisationData(organisation);
          var orgType = [];
          for (const key in organisation) {
            orgType.push(organisation[key].type);
          }
          // console.log(orgType, "2");
          var orgCount = {};
          for (const num of orgType) {
            orgCount[num] = orgCount[num] ? orgCount[num] + 1 : 1;
          }
          // console.log(orgCount, "3");
          // console.log(Object.values(orgCount), "count");
          // orgType = orgType.filter(
          //   (currentValue, index, arr) => arr.indexOf(currentValue) === index
          // );
          // setOrganisationType(Object.keys(orgCount));
          setOrganisation((prevState) => {
            return {
              ...prevState,
              type: Object.keys(orgCount),
              count: Object.values(orgCount),
            };
          });
        }
        setShowSpin(false);
        setLoading(false);
      });
  }, [ctx.refresh]);

  // console.log(organisation, "hihi");
  // console.log(organisationData, "ky hai");
  return (
    <>
      {loading ? (
        <div className="row  justify-content-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="row justify-content-between">
            <div className="col-md-8 shadow p-3 mb-5 bg-body rounded">
              <div className="row">
                <div className="col-auto boldFontSubHeading">
                  <h3>
                    <span
                      className="badge"
                      style={{ backgroundColor: "#BB0000" }}
                    >
                      Organisations
                    </span>
                  </h3>
                </div>
              </div>
              {showSpin ? (
                <div className="row justify-content-center">
                  <Spinner />
                </div>
              ) : (
                <div className="row">
                  {organisationData ? (
                    <>
                      {/* <div className="row justify-content-center">
                      {organisationData.map((organisation) => (
                        <Card
                          key={organisation.id}
                          id={organisation.id}
                          name={organisation.name}
                          type={organisation.type}
                        />
                      ))}
                    </div> */}
                      <div
                        className="row justify-content-center"
                        style={{
                          height: 400,
                          // width: 1200,
                        }}
                      >
                        <Doughnut
                          data={{
                            labels: organisation.type,
                            datasets: [
                              {
                                backgroundColor: [
                                  "#0031B8",
                                  "#FF9A00",
                                  "#FF0000",
                                  "#FFF800",
                                  "#00FF0F",
                                ],
                                hoverBackgroundColor: [
                                  "#2C64FF",
                                  "#FFBA51",
                                  "#FF4949",
                                  "#FFFB6C",
                                  "#6EFF76",
                                ],
                                data: organisation.count,
                              },
                            ],
                          }}
                          options={{
                            // height: 100,
                            // width: 50,
                            maintainAspectRatio: false,
                          }}
                        />
                      </div>
                      <div
                        className="row justify-content-center"
                        style={{ paddingTop: 30 }}
                      >
                        <table className="table table-borderless">
                          <thead
                            className="table tableHeading"
                            style={{ backgroundColor: "#EDF4FF" }}
                          >
                            <tr>
                              <th scope="col">Oragnisation name</th>
                              <th scope="col">Type</th>
                            </tr>
                          </thead>
                          <tbody className="tableData ">
                            {organisationData.map((organisation, index) => (
                              <tr key={index}>
                                <td>{organisation.name}</td>
                                <td>{organisation.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted">No Organisations</p>
                  )}
                </div>
              )}
            </div>

            <div className="col-md-3 shadow p-3 mb-5 bg-body rounded">
              <div className="row">
                <div className="col-auto">
                  <p className="boldFontSubHeading">Add Organisations</p>
                </div>
              </div>
              <div className="row paraTopic">
                <AddOrganisation />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default DashboardBody;
