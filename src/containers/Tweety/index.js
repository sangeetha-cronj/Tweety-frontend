import React, { Component, Fragment } from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import Authorize from '../../components/Auth'
import FormCom from '../../components/FormCom/index'
import Table from '../../components/Table'
import './styles.css'

class Tweety extends Component {

  render() {
    return (
      <Authorize roles={['admin']} redirect to="/">
        <Fragment>
          <nav className="navbar nav-custom">
            <div className="container-fluid">
              <div className="navbar-header">
                <span className="navbar-brand text-color brand">Tweety App</span>
                <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-expanded="false">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav navbar-nav mr-auto">
                  <li className="nav nav-item active">
                    <Link to="/" className="nav-link text-color">
                      Home
							    </Link>

                  </li>
                  <li className="nav nav-item">
                    <Link to="/tweetform" className="nav-link text-color">
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
              <Route path="/view/:userId/:tweetId" exact>
                <Table />
              </Route>
              <Route path="/tweetform" exact>
                <FormCom />
              </Route>
            </Switch>
          </div>

        </Fragment>
      </Authorize>
    )
  }
}

export default Tweety