import TokenInfo from '../components/TokenInfo';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { ETokenStatus } from '../enums/ETokenStatus';

const CheckDaysSetup = () => {
  const utils = render(<TokenInfo />);
  return {
    ...utils,
  };
};

jest.mock('axios');

describe('show token information', () => {
  test('It should show token info', async () => {
    CheckDaysSetup();

    const data = {
      meter: 123456,
      amount: 5000,
      days: 5,
      token_status: ETokenStatus.USED,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    expect(axios.get).toHaveBeenCalled();
  });
});
