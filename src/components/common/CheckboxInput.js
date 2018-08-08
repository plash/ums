import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const CheckboxInput = ({
  name,
  value,
  error,
  checkboxTitle,
  onChange,
  options
}) => {
  const checkboxOptions = options.map(option => (
    <div className="form-check form-check-inline mr-1" key={option.value}>
      <input
        className={classnames("form-check-input", {
          "is-invalid": error
        })}
        name={name}
        value={option.value}
        onChange={onChange}
        checked={option.isSelected}
        type="radio"
        id={`inline-radio${option.value}`}
      />
      <label
        className="form-check-label"
        htmlFor={`inline-radio${option.value}`}
      >
        {option.label}
      </label>
    </div>
  ));
  return (
    <div className="form-group row">
      <label className="col-md-3 col-form-label">{checkboxTitle}</label>
      <div className="col-md-9 col-form-label">{checkboxOptions}</div>
      <label className="col-md-3 col-form-label" />
      <div className="col-md-9 col-form-label">
        {error && (
          <div className="invalid-feedback" style={{ display: "inline" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checkboxTitle: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default CheckboxInput;
