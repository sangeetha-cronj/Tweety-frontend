import React, { Component, Fragment } from 'react'

class Table extends Component {
  render() {
    console.log("in table components-->", this.props)
    return (
      <Fragment>
        <div>
          <h2>List of Tweets</h2>
        </div>
      </Fragment>
    )
  }
}

export default Table