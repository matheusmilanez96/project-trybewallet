import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        { expenses.map((exp) => (
          <tbody key={ exp.id }>
            <tr>
              <td>{ exp.description }</td>
              <td>{ exp.tag }</td>
              <td>{ exp.method }</td>
              <td>{ Number(exp.value).toFixed(2) }</td>
              <td>{ exp.exchangeRates[exp.currency].name }</td>
              <td>{ Number(exp.exchangeRates[exp.currency].ask).toFixed(2) }</td>
              <td>
                {
                  Number(exp.value * exp.exchangeRates[exp.currency].ask).toFixed(2)
                }
              </td>
              <td>BRL</td>
            </tr>
          </tbody>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Table);
