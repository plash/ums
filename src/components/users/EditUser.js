import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { editUser } from "../../actions/userActions";
import TextFieldInput from "../common/TextFieldInput";
import SelectListInput from "../common/SelectListInput";
import classnames from "classnames";

import { userInputValidation } from "../../validations/validations";

import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class EditUser extends Component {
  constructor(props) {
    super(props);
    console.log(moment(new Date(props.user.dob * 1000)));
    this.state = {
      firstName: props.user.first_name,
      lastName: props.user.last_name,
      email: props.user.email,
      phone: props.user.phone,
      dob: moment(new Date(props.user.dob * 1000)),
      active: props.user.active === true ? "1" : "2",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const errObt = this.state.errors;
    delete errObt[e.target.name];
    this.setState({ [e.target.name]: e.target.value, errors: errObt });
  }

  handleDateChange = date => {
    const errObt = this.state.errors;
    delete errObt["dob"];
    this.setState({
      dob: date
    });
  };

  onSubmit(e) {
    e.preventDefault();

    if (Object.keys(userInputValidation(this.state)).length === 0) {
      let active;
      if (this.state.active === "1") {
        active = true;
      } else if (this.state.active === "2") {
        active = false;
      }

      const userData = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        dob: Date.parse(this.state.dob) / 1000,
        active: active
      };

      this.props.editUser(this.props.user.id, userData, this.props.history);
      this.props.onClose();
    } else {
      this.setState({
        errors: userInputValidation(this.state)
      });
    }
  }

  render() {
    const { errors } = this.state;
    // Select options for status
    const options = [
      { label: "Active", value: 1 },
      { label: "Inactive", value: 2 }
    ];

    return (
      <div className="card" style={{ width: "50%" }}>
        <div className="card-header">
          <strong>Edit User</strong>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="name">First Name</label>
                  <TextFieldInput
                    name="firstName"
                    type="text"
                    value={this.state.firstName}
                    onChange={this.onChange}
                    error={errors.firstName}
                    placeholder="First Name"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="name">Last Name</label>
                  <TextFieldInput
                    name="lastName"
                    type="text"
                    value={this.state.lastName}
                    onChange={this.onChange}
                    error={errors.lastName}
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="name">Email</label>
                  <TextFieldInput
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="name">Phone</label>
                  <TextFieldInput
                    name="phone"
                    type="text"
                    value={this.state.phone}
                    onChange={this.onChange}
                    error={errors.phone}
                    placeholder="Phone"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="name">DOB</label>
                  <DatePicker
                    selected={this.state.dob}
                    onChange={this.handleDateChange}
                    className={classnames("form-control", {
                      "is-invalid": errors.dob
                    })}
                    maxDate={new Date()}
                    placeholderText="Select DOB"
                  />
                </div>

                {errors.dob && (
                  <div className="invalid-feedback">{errors.dob}</div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="ccmonth">Status</label>
                  <SelectListInput
                    name="active"
                    value={this.state.active}
                    onChange={this.onChange}
                    error={errors.active}
                    options={options}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <button type="submit" className="btn btn-sm btn-primary mr-3">
              <i className="fa fa-dot-circle-o" /> Submit
            </button>
            <button
              onClick={this.props.onClose}
              className="btn btn-sm btn-danger"
            >
              <i className="fa fa-dot-circle-o" /> Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

EditUser.propTypes = {
  editUser: PropTypes.func.isRequired
};

export default connect(null, { editUser })(EditUser);
