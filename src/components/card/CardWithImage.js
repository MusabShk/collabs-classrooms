const CardWithImage = (props) => {
  return (
    <div className="card col-md-8">
      <div className="card-body">
        <h5 className="card-title headingTopic">{props.subjectName}</h5>

        {props.orgName ? (
          <p className="card-text subheadingTopic">{props.orgName}</p>
        ) : (
          <p className="card-text"></p>
        )}
        <h6>
          <span className="badge alert-primary rounded-pill ">
            {localStorage.getItem("branch")}
            {localStorage.getItem("branchname")}
          </span>
        </h6>
        <p className="card-text">
          <small className="text-muted"></small>
        </p>
      </div>
      <img src="/1.png" className="card-img-top" alt="..." />
    </div>
  );
};

export default CardWithImage;
