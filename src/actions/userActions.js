import axios from "axios";
import {
  GET_USERS,
  DATA_LOADING,
  GET_USER_BY_ID,
  DELETE_USER,
  SAVE_USER,
  EDIT_USER,
  CHANGE_STATUS
} from "./types";
import db from "../utils/db";

// ALL User
export const getUsers = () => dispatch => {
  localStorage.setItem("recall", true);
  dispatch(setDataLoading());
  axios.get(`https://api.myjson.com/bins/pkisp`).then(res => {
    dispatch({
      type: GET_USERS,
      payload: res.data.users
    });
    res.data.users.map(user => {
      return dispatch(addUser(user));
    });
    localStorage.setItem("recall", false);
  });
};

// ALL DB User
export const getDBUsers = () => dispatch => {
  dispatch(setDataLoading());
  db
    .table("users")
    .toArray()
    .then(users => {
      dispatch({
        type: GET_USERS,
        payload: users
      });
    });
};

// Get user by id
export const getUserById = id => dispatch => {
  dispatch(setDataLoading());
  db
    .table("users")
    .where("id")
    .equals(parseInt(id, 10))
    .each(user => {
      dispatch({
        type: GET_USER_BY_ID,
        payload: user
      });
    });
};

// Edit User
export const editUser = (id, userData, history) => dispatch => {
  dispatch(setDataLoading());
  db
    .table("users")
    .update(parseInt(id, 10), userData)
    .then(updated => {
      dispatch({
        type: EDIT_USER,
        payload: id
      });
      dispatch(getDBUsers());
    });
};

// Add User
export const addUser = userData => dispatch => {
  //dispatch(setDataLoading());
  db
    .table("users")
    .add(userData)
    .then(id => {
      dispatch({
        type: SAVE_USER,
        payload: id
      });
      return id;
    });
};

// Add DB User
export const addDBUser = userData => dispatch => {
  dispatch(setDataLoading());
  db
    .table("users")
    .add(userData)
    .then(id => {
      dispatch({
        type: SAVE_USER,
        payload: id
      });
      dispatch(getDBUsers());
    });
};

// Change status of user
export const changeStatus = (id, userData, history) => dispatch => {
  dispatch(setDataLoading());
  db
    .table("users")
    .update(parseInt(id, 10), userData)
    .then(updated => {
      dispatch({
        type: CHANGE_STATUS,
        payload: id
      });
      dispatch(getDBUsers());
      history.push("/users");
    });
};

// Delete user by id
export const deleteUser = (id, history) => dispatch => {
  dispatch(setDataLoading());
  db
    .table("users")
    .delete(parseInt(id, 10))
    .then(() => {
      dispatch({
        type: DELETE_USER,
        payload: id
      });
      dispatch(getDBUsers());
    });
};

// Search User by name or email or phone
export const searchUsers = searchVal => dispatch => {
  dispatch(setDataLoading());
  if (searchVal === "") {
    dispatch(getDBUsers());
  } else {
    db
      .table("users")
      .where("email")
      .startsWithIgnoreCase(searchVal)
      .or("phone")
      .startsWithIgnoreCase(searchVal)
      .or("first_name")
      .startsWithIgnoreCase(searchVal)
      .or("last_name")
      .startsWithIgnoreCase(searchVal)
      .toArray()
      .then(users => {
        dispatch({
          type: GET_USERS,
          payload: users
        });
      });
  }
};

// Set loading
export const setDataLoading = () => {
  return {
    type: DATA_LOADING
  };
};
