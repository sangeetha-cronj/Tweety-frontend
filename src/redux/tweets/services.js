import axios from 'axios'
import { notification } from 'antd'
import {
  ADD_TWEET,
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
        notification.success({
          message: 'Success',
          description:
            'Tweet Added',
        });
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

export const fetchTweet = (id) => dispatch => {
  axios
    .get(`${ServerAddress}/tweets/${id}`)
    .then(res => {
      console.log("api response", res)
      if (res && res.data) {
        dispatch({
          type: FETCH_TWEET,
          payload: {
            currentItem: res.data,
            isCreated: false,
            isUpdated: false,
            isDeleted: false,
          }
        })
      }
    })
}


export const addExtraTweet = (id, data) => dispatch => {
  axios
    .patch(`${ServerAddress}/tweets/${id}`, data)
    .then(res => {
      console.log("api response -->", res)
      if (res.status === 200) {
        notification.success({
          message: 'Success',
          description:
            'Tweet Added',
        });
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