import React from 'react';
import AdicaoDespesas from '../components/AdicaoDespesas';
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
        <AdicaoDespesas />
      </div>);
  }
}

export default Wallet;
