import axios from 'axios'
import {
  ADD_TWEET,
  REMOVE_TWEET,
  UPDATE_TWEET,
  FETCH_TWEET,
  FETCH_TWEETS
} from './actions';

import ServerAddress from '../../common/config'

export const addTweet = (data) => dispatch => {
  axios
    .post(`${ServerAddress}/tweets`, data)
    .then(res => {
      console.log("api response -->", res)
      if (res.status === 201) {
        dispatch({
          type: ADD_TWEET,
          payload: {
            items: [],
            currentItem: res.data,
            isCreated: true,
            isUpdated: false,
            isDeleted: false,
          }
        })
      }

    }).catch(err => {
      console.log("error [api]", err)
    });
};

export const fetchAllTweets = () => dispatch => {
  axios
    .get(`${ServerAddress}/tweets`)
    .then(res => {
      console.log("api response", res)
      if (res && res.data) {
        dispatch({
          type: FETCH_TWEETS,
          payload: {
            items: res.data,
            currentItem: {},
            isCreated: false,
            isUpdated: false,
            isDeleted: false,
          }
        })
      }
    })
}