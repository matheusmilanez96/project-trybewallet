import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <h2 data-testid="email-field">
          { email }
        </h2>
        <h3 data-testid="total-field">
          {
            Number((
              expenses.reduce((acc, curr) => (
                acc + curr.value * curr.exchangeRates[curr.currency].ask
              ), 0)
            )).toFixed(2)
          }
        </h3>
        <h4 data-testid="header-currency-field">
          BRL
        </h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
