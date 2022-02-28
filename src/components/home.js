import { Route } from 'react-router-dom';
import React from 'react';
import Login from '../pages/Login';
import wallet from '../pages/Wallet';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ wallet } />
      </div>
    );
  }
}

export default Home;
