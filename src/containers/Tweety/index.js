import React, { Component, Fragment } from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import FormCom from '../../components/FormCom/index'
import Table from '../../components/Table'
import './styles.css'

class Tweety extends Component {

  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-custom">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Tweety App</a>
              <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-expanded="false">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav mr-auto">
                <li className="nav nav-item active">
                  <Link to="/" className="nav-link">
                    Home
							</Link>

                </li>
                <li className="nav nav-item">
                  <Link to="/tweetform" className="nav-link">
                    Add Tweet
							</Link>
                </li>

              </ul>
            </div>

          </div>
        </nav>

        <div>
          <Switch>
            <Route path="/" exact>
              <Table />
            </Route>
            <Route path="/tweetform">
              <FormCom />
            </Route>
          </Switch>
        </div>

      </Fragment>
    )
  }
}

export default Tweety