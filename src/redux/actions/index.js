export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

const submitLogin = (loginInfo) => ({
  type: SUBMIT_LOGIN,
  payload: loginInfo,
});

export { submitLogin };
