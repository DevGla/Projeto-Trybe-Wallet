import React from 'react';
// import { connect } from 'react-redux';

class Expenses extends React.Component {
  render() {
    return (
      <div>
        <p>Despesa Total Gerada:</p>
        <p data-testid="total-field">0</p>
      </div>
    );
  }
}

export default Expenses;
