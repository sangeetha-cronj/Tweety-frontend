import React, { Component } from 'react'
import { Form, Input, DatePicker, Button } from 'antd'
import { connect } from 'react-redux';
import { addTweet, addExtraTweet } from '../../redux/tweets/services'

const mapStateToProps = (state) => {
  return {
    currentTweet: state.currentItem,
    isCreated: state.isCreated
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTweetFunc: (data) => dispatch(addTweet(data)),
    addExtraTweetFunc: (id, data) => dispatch(addExtraTweet(id, data)),
  };
};

class FormCom extends Component {

  constructor(props) {
    super(props)
    this.state = { isAddOneMore: false }
  }

  componentDidMount() {
    if (this.props.id) {
      this.setState({ isAddOneMore: true, })
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { userName, text, createdAt } = values
        const body = { userName, tweets: [{ text, createdAt }] }

        this.props.addTweetFunc(body)
      }
    });
  };

  addOneMoreFunc = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received  more tweets values of form: ', values);
        const { userName, text, createdAt } = values
        const id = this.props.id
        const body = { userName, tweets: [{ text, createdAt, }, ...this.props.tweets.tweets] }
        // console.log("body==>", body, this.props.tweets)
        this.props.addExtraTweetFunc(id, body)
      }
    });

  }

  render() {
    const { getFieldDecorator } = this.props.form
    console.log("props in form-->", this.props)
    // const { isAddOneMore } = this.state
    // const { username } = this.props
    return (
      <div className="container">
        <h2>Add Tweets</h2>
        <Form onSubmit={this.state.isAddOneMore ? this.addOneMoreFunc : this.handleSubmit}>
          <Form.Item label="User Name" name="userName">
            {getFieldDecorator('userName', {
              initialValue: this.state.isAddOneMore ? this.props.username : null,
              rules: [{
                required: true,
                message: 'please input your Name'
              }]
            })(<Input style={{ width: 500 }} />)}
          </Form.Item>
          <Form.Item label="Tweet" name="text">
            {getFieldDecorator('text', {
              rules: [{
                required: true,
                message: 'please input Tweet!'
              }]
            })(<Input style={{ width: 500 }} />)}
          </Form.Item>
          <Form.Item label="Date" name="createdAt">
            {getFieldDecorator('createdAt', {
            })(<DatePicker />)}
          </Form.Item>
          <Form.Item>

            <Button type="primary" htmlType="submit">Submit</Button>

          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(FormCom))