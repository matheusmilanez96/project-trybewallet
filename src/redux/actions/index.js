export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

const submitLogin = (loginInfo) => ({
  type: SUBMIT_LOGIN,
  payload: loginInfo,
});

const fetchCurrencies = (currencies) => ({
  type: FETCH_CURRENCIES,
  payload: currencies,
});

export { submitLogin, fetchCurrencies };
