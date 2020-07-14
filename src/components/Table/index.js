import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'antd'
import _ from 'lodash'
import { fetchAllTweets, fetchTweet } from '../../redux/tweets/services'
import './styles.css'

class Table extends Component {

  constructor(props) {
    super(props)
    this.state = { tweets: [] }
  }
  componentDidMount() {
    this.props.fetchTweetsFunc()
  }

  selectHandler = (e) => {
    console.log("checkk", e.target.value)
    const id = e.target.value

    this.props.fetchTweetFunc(id)
  }

  render() {
    console.log("in table components-->", this.props.tweets, this.props.currentTweet)
    let tweetBox = ""
    let addBtn = ""

    const isEmpty = _.isEmpty(this.props.currentTweet)

    if (!isEmpty) {
      // addBtn = <link to="/tweetform"><i class="fa fa-plus" aria-hidden="true"></i></link>
      tweetBox = this.props.currentTweet.tweets.map(data => (
        <div className="mb-4">
          <Card title="Tweet" className="mb-5" extra={<a href="#">Add</a>} style={{ width: 300 }}>
            <p className="text-center">{data.text}</p>
          </Card>
        </div>
      ))
    } else {
      tweetBox = this.props.tweets.map(data => (
        data.tweets.map(element => (
          <div className="mb-4">
            <Card title="Tweet" className="mb-5" extra={<a href="#">Add</a>} style={{ width: 300 }}>
              <p className="text-center">{element.text}</p>
            </Card>
          </div>
        ))

      ))
    }

    return (
      <Fragment>
        <div className="viewContainer">
          <h2>List of Tweets</h2>
          <select name="id" id="cars" className="mb-3" onChange={this.selectHandler}>
            <option value="">select user</option>
            {this.props.tweets.map(data => (<option value={data._id}>{data.userName}</option>))}
          </select>
          {addBtn}

          {tweetBox}


        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("hgs", state)
  return {
    tweets: state.tweets.items,
    currentTweet: state.tweets.currentItem,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTweetsFunc: () => dispatch(fetchAllTweets()),
    fetchTweetFunc: (id) => dispatch(fetchTweet(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table)