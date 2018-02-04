import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Actions from 'actions';
import Button from 'common/Button';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="form-container">
          <div className="form-label">Welcome Back!</div>
          <div className="form-button">
            <Button label="Sign Out" onPress={() => this.props.signOut()} />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  signOut: PropTypes.func.isRequired,
};

Home.defaultProps = {
};

const mapStateToProps = store => ({
});

const mapDispatchToProps = {
  signOut: Actions.signOut,
};

export default connect(null, mapDispatchToProps)(Home);
