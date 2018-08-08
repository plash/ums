import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListInput = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div>
      <select
        className={classnames("form-control", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="0">Select Value</option>
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted" />}
      {error && (
        <div className="invalid-feedback" style={{ display: "inline" }}>
          {error}
        </div>
      )}
    </div>
  );
};

SelectListInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListInput;
