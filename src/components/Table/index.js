import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, Select, Button } from 'antd'
import _ from 'lodash'
import FormCom from '../FormCom/index'
import { fetchAllTweets, fetchTweet } from '../../redux/tweets/services'
import './styles.css'

class Table extends Component {

  constructor(props) {
    super(props)
    this.state = { isAddtweet: false, tweets: [], isView: false }
  }
  componentDidMount() {
    this.props.fetchTweetsFunc()
    // console.log(this.props.match.userId)
    // if (this.props.match.path === '/view/:userId') {
    // }
  }

  componentDidUpdate(nextState, prevProps) {
    console.log("componentWillReceiveProps", nextState, prevProps)
    if (prevProps.isView && this.props.match.params.userId) {
      this.props.fetchTweetFunc(this.props.match.params.userId)
    }

  }

  selectHandler = (e) => {
    console.log("checkk", e)
    const id = e

    this.props.fetchTweetFunc(id)
  }
  onClickAddTweet = () => {
    this.setState({ isAddtweet: true })
  }
  render() {
    console.log("in table components-->", this.props)
    let tweetBox = ""
    let addBtn = ""
    let filteredarr = []
    const isEmpty = _.isEmpty(this.props.currentTweet)

    if (this.props.match.params.userId && this.props.match.params.tweetId && this.state.isView === false) {
      console.log("checkkk==>", this.props.match.path)
      this.setState({ isView: true })
    }



    if (!isEmpty) {
      // addBtn = <Link to={`/tweetform/${this.props.currentTweet._id}`}><i className="fa fa-plus fa-2x" aria-hidden="true"></i>Add Tweet</Link>
      if (this.state.isView) {
        console.log("filterr->", this.props.currentTweet.tweets)
        filteredarr = this.props.currentTweet.tweets.filter(data => (data._id === this.props.match.params.tweetId))

        tweetBox = filteredarr.map(data => (
          <div className="margin-bottom">
            <Card title={this.props.currentTweet.userName} extra="" style={{ width: 300 }}>
              <p className="text-center">{data.text}</p>
            </Card>
          </div>
        ))
      } else {

        addBtn = <Button onClick={this.onClickAddTweet}>Add Tweet</Button>

        tweetBox = this.props.currentTweet.tweets.map(data => {
          var newTo = {
            pathname: `/view/${this.props.currentTweet._id}/${data._id}`
          }
          return (<div className="margin-bottom">
            <Card title={this.props.currentTweet.userName} extra={<Link to={newTo}>view</Link>} style={{ width: 300 }}>
              <p className="text-center">{data.text}</p>
            </Card>
          </div>
          )
        }
        )
      }
    } else {
      addBtn = <Link to="/tweetform"><Button onClick={this.onClickAddTweet}>Add Tweet</Button></Link>
      tweetBox = this.props.tweets.map(data => {
        var username = data.userName
        var userId = data._id
        return (data.tweets.map(element => {
          var newTo = {
            pathname: `/view/${userId}/${element._id}`
          }
          return (<div className="margin-bottom">
            <Card title={username} extra={<Link to={newTo}>view</Link>} style={{ width: 300 }}>
              <p className="text-center">{element.text}</p>
            </Card>
          </div>
          )
        }
        ))
      })
    }

    return (
      <Fragment>
        {this.state.isAddtweet ? <FormCom id={this.props.currentTweet._id} tweets={this.props.currentTweet} username={this.props.currentTweet.userName} />
          :
          <div className="viewContainer">
            <h2>List of Tweets</h2>
            <Select name="id" id="cars" placeholder="select user" className="margin-bottom" onChange={this.selectHandler} style={{ width: 100 }}>
              {this.props.tweets.map(data => (<Select.Option value={data._id}>{data.userName}</Select.Option>))}
            </Select>
            <div className="margin-bottom margin-top">
              {addBtn}
            </div>
            {tweetBox}
          </div>
        }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Table))