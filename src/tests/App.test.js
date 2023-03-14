import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';

const emailInput = 'email-input';
const pwdInput = 'password-input';
const fakeEmail = 'email@gmail.com';
const fakePwd = 'senha123';

describe('Testes para o projeto', () => {
  test('Verifica se os elementos estão sendo renderizados', () => {
    renderWithRouterAndRedux(<App />);

    const emailField = screen.getByTestId(emailInput);
    const pwdField = screen.getByTestId(pwdInput);
    const buttonEl = screen.getByRole('button');

    expect(emailField).toBeInTheDocument();
    expect(pwdField).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });
  test('Verifica se é possível interagir com os elementos', () => {
    renderWithRouterAndRedux(<App />);

    const emailField = screen.getByTestId(emailInput);
    const pwdField = screen.getByTestId(pwdInput);

    userEvent.type(emailField, fakeEmail);
    expect(emailField).toHaveValue(fakeEmail);

    userEvent.type(pwdField, fakePwd);
    expect(pwdField).toHaveValue(fakePwd);
  });
  test('Verifica se está na página inicial', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Verifica se é redirecionado para a página carteira ao clicar no botão e se o email está na página', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailField = screen.getByTestId(emailInput);
    const pwdField = screen.getByTestId(pwdInput);

    userEvent.type(emailField, fakeEmail);
    userEvent.type(pwdField, fakePwd);
    const buttonEl = screen.getByRole('button');

    userEvent.click(buttonEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const walletEmailField = screen.getByTestId('email-field');
    expect(walletEmailField).toBeInTheDocument();
    expect(walletEmailField.innerHTML).toBe(fakeEmail);
  });
  test('Verifica se os elementos estão sendo renderizados na página de carteira', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const totalField = screen.getByTestId('total-field');
    const currencyField = screen.getByTestId('header-currency-field');

    expect(totalField).toBeInTheDocument();
    expect(currencyField).toBeInTheDocument();
  });
  test('Verifica se os elementos da carteira estão na tela e interage com eles', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueText = screen.getByText('Valor:');
    const currencyText = screen.getByText('Moeda:');
    const methodText = screen.getByText('Método de pagamento:');
    const tagText = screen.getByText('Categoria:');
    const descriptionText = screen.getByText('Descrição:');
    const buttonEl = screen.getByRole('button');

    expect(valueText).toBeInTheDocument();
    expect(currencyText).toBeInTheDocument();
    expect(methodText).toBeInTheDocument();
    expect(tagText).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();

    const valueField = screen.getByTestId('value-input');
    const currencyField = screen.getByTestId('currency-input');
    const methodField = screen.getByTestId('method-input');
    const tagField = screen.getByTestId('tag-input');
    const descriptionField = screen.getByTestId('description-input');

    expect(valueField).toBeInTheDocument();
    expect(currencyField).toBeInTheDocument();
    expect(methodField).toBeInTheDocument();
    expect(tagField).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();

    userEvent.type(valueField, '0');
    userEvent.type(descriptionField, 'first');
    userEvent.click(buttonEl);
  });
});
