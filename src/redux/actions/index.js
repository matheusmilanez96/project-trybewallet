export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';

const submitLogin = (loginInfo) => ({
  type: SUBMIT_LOGIN,
  payload: loginInfo,
});

const fetchCurrencies = (currencies) => ({
  type: FETCH_CURRENCIES,
  payload: currencies,
});

const addExpenses = (form) => ({
  type: ADD_EXPENSES,
  payload: form,
});

export function submitForm(form) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const obj = await response.json();
    delete obj.USDT;
    const exchangeRates = { exchangeRates: obj };
    const newObj = { ...form, ...exchangeRates };
    console.log(newObj);
    dispatch(addExpenses(newObj));
  };
}

export { submitLogin, fetchCurrencies, addExpenses };
