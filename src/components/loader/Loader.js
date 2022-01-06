const Loader = () => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="text-center">
        <span className="headingTopic">Loading... </span>

        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
