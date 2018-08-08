import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Moment from "react-moment";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import

import { changeStatus, deleteUser } from "../../actions/userActions";

import Modal from "../common/Modal";
import EditUser from "./EditUser";

class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.onDelete = this.onDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }
  handleShow() {
    this.setState({ showModal: true });
  }

  handleHide() {
    this.setState({ showModal: false });
  }

  confirmDelete() {
    this.props.deleteUser(this.state.userId, this.props.history);
  }

  onChange(e) {
    e.preventDefault();

    let active;
    if (e.currentTarget.dataset.value === "false") {
      active = true;
    } else {
      active = false;
    }
    const userData = {
      active: active
    };

    this.props.changeStatus(
      e.currentTarget.dataset.id,
      userData,
      this.props.history
    );
  }

  onDelete(e) {
    const userId = e.currentTarget.dataset.id;
    this.setState({ userId: userId });
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this user?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                this.confirmDelete();
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      }
    });
  }

  render() {
    const { user } = this.props;
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <EditUser user={user} onClose={this.handleHide} />
        </div>
      </Modal>
    ) : null;
    return (
      <tr>
        {modal}
        <td>
          <Link to={`/user/${user.id}`}>
            {user.first_name + " " + user.last_name}
          </Link>
        </td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>
          <Moment format="DD/MM/YYYY">{new Date(user.dob * 1000)}</Moment>
        </td>
        <td>{getAge(user.dob)}</td>
        <td>
          <label className="switch switch-primary">
            <input
              name="active"
              type="checkbox"
              className="switch-input"
              checked={user.active === true ? "checked" : ""}
              onChange={this.onChange}
              data-id={user.id}
              data-value={user.active}
            />
            <span className="switch-slider" />
            {user.active === true ? (
              <span className="badge badge-success">Active</span>
            ) : (
              <span className="badge badge-secondary">Inactive</span>
            )}
          </label>
        </td>
        <td>
          <Link className="btn btn-primary btn-sm mr-2" to={`/user/${user.id}`}>
            <i className="fa fa-eye" />
          </Link>
          <a className="btn btn-info btn-sm mr-2" onClick={this.handleShow}>
            <i className="fa fa-edit " />
          </a>
          <a
            className="btn btn-danger btn-sm"
            data-id={user.id}
            onClick={this.onDelete}
          >
            <i className="fa fa-trash-o " />
          </a>
        </td>
      </tr>
    );
  }
}

UserItem.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

export default connect(null, { deleteUser, changeStatus })(
  withRouter(UserItem)
);

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString * 1000);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
