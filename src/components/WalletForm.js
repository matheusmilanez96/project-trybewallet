import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const currArr = await this.apiRequest();
    dispatch(fetchCurrencies(currArr));
  }

  apiRequest = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const obj = await request.json();
    const arr = Object.keys(obj);
    const filteredArr = arr.filter((el) => el !== 'USDT');
    return filteredArr;
  };

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <div>
          <p>Valor: </p>
          <input
            id="value"
            type="number"
            name="value"
            data-testid="value-input"
          />
        </div>
        <div>
          <p>Moeda: </p>
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
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
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </div>
        <div>
          <p>Categoria: </p>
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </div>
        <div>
          <p>Descrição: </p>
          <input
            id="description"
            type="text"
            name="description"
            data-testid="description-input"
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
