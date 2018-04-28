import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'rect-redux';

const HomePage = ({ isAuthenticated }) => (
  <div>
    <h1>Home Page</h1>
    {isAuthenticated ? <button>Logout</button> : <Link to="/login">Login</Link>}
  </div>
);

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

export default connect(mapStateToProps)(HomePage);
