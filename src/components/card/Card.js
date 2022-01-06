import { BrowserRouter, useHistory, Redirect } from "react-router-dom";

const Card = (props) => {
  const history = useHistory();

  const onClickHandler = () => {
    localStorage.setItem("organisation", props.name);
    history.push(`/admin/${props.name}`);
  };

  return (
    <div className="col-auto " style={{ padding: 5 }} onClick={onClickHandler}>
      <ul className="list-group ">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {props.name} &nbsp;
          <span className="badge  bg-dark">{props.type}</span>
        </li>
      </ul>
    </div>
    // <div className="col-md-2 " style={{ padding: 10 }} onClick={onClickHandler}>
    //   <div className="card text-center">
    //     {/* <div className="card-header">Featured</div> */}
    //     <div className="card-body">
    //       <p
    //         className="card-title"
    //         style={{ fontSize: 12, fontWeight: "bold" }}
    //       >
    //         {props.name}{" "}
    //       </p>

    //       {/* <p className="card-text">
    //       With supporting text below as a natural lead-in to additional content.
    //     </p>
    //     <a href="#" className="btn btn-primary">
    //       Go somewhere
    //     </a> */}
    //     </div>
    //     <span className="card-footer badge bg-light text-secondary">
    //       {props.type}
    //     </span>
    //     {/* <div className="card-footer bg-dark text-white  "></div> */}
    //   </div>
    // </div>
    // <div className="col-sm-4 ">
    //   <ul className="list-group">
    //     <li className="list-group-item d-flex justify-content-between align-items-center">
    //       <div className="fw-bold">Subheading</div>A list item
    //       <span className="badge bg-primary rounded-pill">14</span>
    //     </li>
    //     <li className="list-group-item d-flex justify-content-between align-items-center">
    //       A second list item
    //       <span className="badge bg-primary rounded-pill">2</span>
    //     </li>
    //     <li className="list-group-item d-flex justify-content-between align-items-center">
    //       A third list item
    //       <span className="badge bg-primary rounded-pill">1</span>
    //     </li>
    //   </ul>
    // </div>
  );
};

export default Card;
