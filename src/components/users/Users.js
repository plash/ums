import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getUsers, getDBUsers, searchUsers } from "../../actions/userActions";
import UserItem from "./UserItem";
import Spinner from "../common/Spinner";

import TextFieldInput from "../common/TextFieldInput";

import Modal from "../common/Modal";
import AddUser from "./AddUser";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showModal: false,
      searchVal: ""
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }
  handleShow() {
    this.setState({ showModal: true });
  }

  handleHide() {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    if (localStorage.getItem("recall") !== "false") {
      this.props.getUsers();
    } else {
      this.props.getDBUsers();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users && nextProps.users.users.length > 0) {
      this.setState({
        users: nextProps.users.users
      });
    }
  }

  onChange = e => {
    const searchVal = e.target.value;

    this.setState({ searchVal });
    this.props.searchUsers(searchVal);
  };

  render() {
    const { loading } = this.props.users;
    const users = this.state.users;
    const userItem =
      users !== undefined
        ? users.map((user, index) => <UserItem key={index} user={user} />)
        : null;
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <AddUser onClose={this.handleHide} />
        </div>
      </Modal>
    ) : null;
    return (
      <div className="row">
        {modal}
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center"> Users </h4>
              <div className="row">
                <div className="col-md-4">
                  <TextFieldInput
                    name="searchVal"
                    type="text"
                    value={this.state.searchVal}
                    onChange={this.onChange}
                    placeholder="Search User by name/email/phone"
                  />
                </div>
                <div className="col-md-8">
                  <a
                    className="pull-right btn btn-pill btn-info"
                    onClick={this.handleShow}
                  >
                    <i className="fa fa-plus" />
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body">
              {loading ? (
                <Spinner />
              ) : (
                <table className="table table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>DOB</th>
                      <th>Age</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>{userItem}</tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps, { getUsers, getDBUsers, searchUsers })(
  Users
);
