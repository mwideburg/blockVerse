import {
  RECIEVE_WORLDS,
} from "../actions/user_actions";



const initialState = {
    worlds: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case RECIEVE_WORLDS:
        return Object.assign({}, {worlds: action.worlds});
    default:
      return state;
  }
};