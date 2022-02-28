import React from 'react';
import CambioUtilizado from '../components/CambioUtilizado';
import Expenses from '../components/Expenses';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expenses />
        <CambioUtilizado />
      </div>);
  }
}

export default Wallet;
