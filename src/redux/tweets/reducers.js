import {
  ADD_TWEET,
  FETCH_TWEET,
  FETCH_TWEETS
} from './actions';

const initialState = {
  items: [],
  currentItem: {},
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
}

export default function (state = initialState, action) {
  // console.log("reducerrr-->", action)
  switch (action.type) {
    case ADD_TWEET:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_TWEET:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_TWEETS:
      state = {
        ...state,
        ...action.payload
      }
      return state;

    default:
      return state;
  }
}