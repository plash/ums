import { DATA_LOADING, GET_USERS, GET_USER_BY_ID } from "../actions/types";

const initialState = {
  loading: false,
  users: [],
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
