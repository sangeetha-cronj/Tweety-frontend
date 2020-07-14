import React, { Component, Fragment } from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import FormCom from '../../components/FormCom/index'
import Table from '../../components/Table'
import './styles.css'

class Tweety extends Component {

  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Tweety App</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Home
							</Link>

              </li>
              <li className="nav-item">
                <Link to="/viewtweets" className="nav-link">
                  View
							</Link>
              </li>

            </ul>
          </div>
        </nav>
        <div>
          <Switch>
            <Route path="/" exact>
              <Table />
            </Route>
            <Route path="/viewtweets">
              <FormCom />
            </Route>
          </Switch>
        </div>

      </Fragment>
    )
  }
}

export default Tweety