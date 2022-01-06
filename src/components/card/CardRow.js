import { MdDelete } from "react-icons/md";

const CardRow = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row justify-content-between">
          <div className="col-auto">
            <h6>{props.name}</h6>
          </div>
          <div className="col-auto">
            <button type="button" className="col-auto btn btn-link btn-sm">
              Delete
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRow;
