import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, submitForm } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const currArr = await this.apiRequest();
    dispatch(fetchCurrencies(currArr));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(event) {
    event.preventDefault();

    const { id } = this.state;
    const { dispatch } = this.props;

    dispatch(submitForm(this.state));

    this.setState({
      id: id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  apiRequest = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const obj = await response.json();
    const arr = Object.keys(obj);
    const filteredArr = arr.filter((el) => el !== 'USDT');
    return filteredArr;
  };

  render() {
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <div>
          <p>Valor: </p>
          <input
            id="value"
            type="number"
            name="value"
            onChange={ this.handleChange }
            value={ value }
            data-testid="value-input"
          />
        </div>
        <div>
          <p>Moeda: </p>
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            { currencies.map((curr) => (
              <option
                value={ curr }
                key={ curr }
              >
                { curr }
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Método de pagamento: </p>
          <select
            name="method"
            id="method"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </div>
        <div>
          <p>Categoria: </p>
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
        <div>
          <p>Descrição: </p>
          <input
            id="description"
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
          />
        </div>
        <br />
        <button
          type="submit"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}
// npm run cy -- --spec cypress/e2e/_requirements/04.SaveExpensesForm.cy.js
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
