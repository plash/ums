import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="clearfix">
            <h1 className="float-left display-3 mr-4">404</h1>
            <h4 className="pt-3">Oops! You're lost.</h4>
            <p className="text-muted">
              The page you are looking for was not found.
            </p>
            <Link className="btn-pill btn btn-primary btn-sm" to={`/`}>
              <i className="fa fa-arrow-circle-left" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
