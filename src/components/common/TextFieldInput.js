import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  iconElement,
  onChange,
  disabled
}) => {
  return (
    <div className="input-group mb-3">
      {iconElement != null ? (
        <div className="input-group-prepend">
          <span className="input-group-text">{iconElement}</span>
        </div>
      ) : null}
      <input
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        className={classnames("form-control", {
          "is-invalid": error
        })}
      />
      {info && <small className="form-text text-muted" />}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  iconElement: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
