import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delExp } from '../redux/actions';

class Table extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    const { expenses, dispatch } = this.props;
    dispatch(delExp(expenses, id));
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
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
              <td>
                <button
                  data-testid="delete-btn"
                  type="submit"
                  onClick={ () => this.handleClick(exp.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Table);
