import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

import { getUserById } from "../../actions/userActions";

import Spinner from "../common/Spinner";

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        active: ""
      }
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.id;
    if (isNaN(parseInt(userId, 10))) {
      this.props.history.push("/not-found");
    } else {
      this.props.getUserById(userId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      const { user } = nextProps.user;
      this.setState({
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          dob: new Date(user.dob * 1000),
          phone: user.phone,
          active: user.active
        }
      });
    }
  }

  goBack = () => {
    this.props.history.push("/users");
  };

  render() {
    const { loading } = this.props.user;
    const { user } = this.state;
    return (
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <i className="fa fa-align-justify" />
              <strong>User Profile</strong>
              <div className="card-header-actions">
                <button
                  className="btn-pill btn btn-primary btn-block"
                  onClick={this.goBack}
                >
                  <i className="fa fa-arrow-circle-left" />
                </button>
              </div>
            </div>
            <div id="collapseExample" className="collapse show">
              {loading ? (
                <Spinner />
              ) : (
                <div className="card-body row">
                  <div className="col-md-2">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <b>Name</b>
                      </li>
                      <li className="list-group-item">
                        <b>Email</b>
                      </li>
                      <li className="list-group-item">
                        <b>Phone</b>
                      </li>
                      <li className="list-group-item">
                        <b>DOB</b>
                      </li>
                      <li className="list-group-item">
                        <b>Status</b>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item">
                        {user.firstName + " " + user.lastName}
                      </li>
                      <li className="list-group-item">{user.email}</li>
                      <li className="list-group-item">{user.phone}</li>
                      <li className="list-group-item">
                        <Moment format="DD/MM/YYYY">
                          {new Date(user.dob)}
                        </Moment>
                      </li>
                      <li className="list-group-item">
                        {user.active ? (
                          <button className="btn-pill btn btn-success btn-sm">
                            Active
                          </button>
                        ) : (
                          <button className="btn-pill btn btn-danger btn-sm">
                            Inactive
                          </button>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users
  };
};

export default connect(mapStateToProps, { getUserById })(UserDetail);
