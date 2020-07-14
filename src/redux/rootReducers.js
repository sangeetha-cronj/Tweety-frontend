import { combineReducers } from 'redux'
import tweetReducer from './tweets/reducers'

const rootReducer = combineReducers({
  tweets: tweetReducer
});

export default rootReducer