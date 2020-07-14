import React, { Component } from 'react'
import { Form, Input, DatePicker, Button } from 'antd'
import { connect } from 'react-redux';
import { addTweet } from '../../redux/tweets/services'

const mapStateToProps = (state) => {
  return {
    currentTweet: state.currentItem,
    isCreated: state.isCreated
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTweetFunc: (data) => dispatch(addTweet(data)),
  };
};

class FormCom extends Component {

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

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className="container">
        <h2>Add Tweets</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="User Name" name="userName">
            {getFieldDecorator('userName', {
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