import { useEffect } from "react";
import { TiPlus } from "react-icons/ti";

const OrganisationBody = (props) => {
  if (props.branches) {
    fetch(
      `https://crm-management-6790c-default-rtdb.firebaseio.com/organisation/${props.id}/branches`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data, "daa");
      })
      .catch((error) => {
        // console.log("err");
      });
  }
  useEffect(() => {}, []);

  return (
    <div className="card">
      <div className="card-body">
        {props.branches ? (
          <></>
        ) : (
          <>
            <div className="row">
              <div className="alert alert-light" role="alert">
                ---No Branch &nbsp;
                <a
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <TiPlus />
                </a>
                <div class="collapse" id="collapseExample">
                  <div class="card card-body">
                    Some placeholder content for the collapse component. This
                    panel is hidden by default but revealed when the user
                    activates the relevant trigger.
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrganisationBody;
