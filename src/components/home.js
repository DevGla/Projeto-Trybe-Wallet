import { Route } from 'react-router-dom';
import React from 'react';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ Login } />
        <Route
          exact
          path="/carteira"
          render={ ({ history }) => <Wallet history={ history } /> }
        />
      </div>
    );
  }
}

export default Home;
