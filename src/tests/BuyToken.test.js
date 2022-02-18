import BuyToken from '../components/BuyToken';
import '@testing-library/jest-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const buyTokenPageSetup = () => {
  const utils = render(<BuyToken />);
  const meterInput = screen.getByPlaceholderText('Enter your meter number');
  const amountInput = screen.getByPlaceholderText('Enter amount of money');
  return {
    meterInput,
    amountInput,
    ...utils,
  };
};

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('It should show an error for amount input', async () => {
  const { amountInput } = buyTokenPageSetup();
  userEvent.type(amountInput, '123');

  expect(amountInput).toHaveAttribute('type', 'number');

  await waitFor(() => {
    expect(
      screen.getByText('amount must be a multiple of 100 and less than 182,500')
    ).toBeInTheDocument();
  });
});

test('It should show an error for meter number input', async () => {
  const { meterInput } = buyTokenPageSetup();

  userEvent.type(meterInput, '12345');
  fireEvent.change(meterInput, { target: { value: '12345' } });

  expect(meterInput).toHaveAttribute('type', 'number');

  await waitFor(() => {
    expect(screen.getByText('meter must be 6 characters.')).toBeInTheDocument();
  });
});
