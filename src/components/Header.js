import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userEmail } = this.props;
    // console.log(userEmail);
    // verificar o porque do userEmail não está aparecendo na tela mas passando no teste
    return (
      <div>
        <p data-testid="email-field">
          { userEmail }
        </p>
      </div>);
  }
}
// verificar essa função com o parentese só
const mapStateToProps = (state) => (
  {
    userEmail: state.user.email,
  }
);

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
