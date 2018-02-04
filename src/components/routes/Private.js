import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class PrivateRoute extends Component {
  render() {
    const { component: Component, token, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={
          props => (
            token ? (
              <div className="private">
                <div className="content container">
                  <Component {...props} />
                </div>
              </div>
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location },
                }}
              />
            )
          )
        }
      />
    );
  }
}


PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  token: PropTypes.string,
};

PrivateRoute.defaultProps = {
  token: null,
};

export default PrivateRoute;
