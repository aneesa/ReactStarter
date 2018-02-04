import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Actions from 'actions';
import CONFIG from 'utils/config';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './views/SignIn';
import Home from './views/Home';

import PrivateRoute from './routes/Private';

class App extends Component {
  componentDidMount() {
    // const ENV = process.env.NODE_ENV;
    // console.log(`Environment: ${ENV}, API Endpoint: ${CONFIG[ENV].SERVER_URL}`);
  }

  renderRoutes() {
    const { token } = this.props;

    return (
      <div className="main">
        <Switch>
          {!token && <Route exact path="/" component={SignIn} />}
          {token && <PrivateRoute exact path="/" component={Home} token={token} />}
        </Switch>
      </div>
    );
  }

  render() {
    return (
      <BrowserRouter>
        {this.renderRoutes()}
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  token: PropTypes.string,
};

App.defaultProps = {
  token: null,
};

const mapStateToProps = store => ({
  token: Actions.getToken(store),
});

export default connect(mapStateToProps)(App);
