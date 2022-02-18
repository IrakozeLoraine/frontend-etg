import { render, fireEvent, waitFor } from '@testing-library/react';
import CheckDays from '../components/CheckDays';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const CheckDaysSetup = () => {
  const utils = render(<CheckDays />);
  const meterInput = screen.getByPlaceholderText(
    'Find number of days remaining'
  );
  return {
    meterInput,
    ...utils,
  };
};

test('It should show an error for meter number input', async () => {
  const { meterInput } = CheckDaysSetup();

  userEvent.type(meterInput, '12345');
  fireEvent.change(meterInput, { target: { value: '12345' } });

  expect(meterInput).toHaveAttribute('type', 'number');

  await waitFor(() => {
    expect(screen.getByText('meter is invalid')).toBeInTheDocument();
  });
});
