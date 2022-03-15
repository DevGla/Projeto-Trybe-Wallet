import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { stateUser, stateWallet } = this.props;
    return (
      <div>
        <header>
          <h3>TrybeWallet</h3>
          <p data-testid="email-field">{ stateUser.email}</p>
          <p>Total Expense:</p>
          <p data-testid="total-field">{ stateWallet.soma || 0 }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateUser: state.user,
  stateWallet: state.wallet,
});

Header.propTypes = {
  stateUser: PropTypes.string.isRequired,
  stateWallet: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
