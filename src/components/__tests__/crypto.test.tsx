import { render, screen, cleanup } from '@testing-library/react';
import Crypto from '../Crypto';
import SearchCoin from '../SearchCoin';

test('should render crypto component', () => {
  render(<Crypto />);
  const cryptoElement = screen.getByTestId('crypto');
  expect(cryptoElement).toBeInTheDocument();
});

test('should render search-coin component', () => {
  render(<SearchCoin />);
  const searchCryptoElement = screen.getByTestId('searchCoin');
  expect(searchCryptoElement).toBeInTheDocument();
});

test('should render bitcoin search-coin component', () => {
  const coinInfo = {
    name: 'Bitcoin',
    market_cap_rank: 2,
    market_data: { current_price: { aud: 456789 }, max_supply: 7894654612 },
  };
  render(<SearchCoin coinInfo={coinInfo} />);
  const searchCryptoElement = screen.getByTestId('searchCoin');
  expect(searchCryptoElement).toBeInTheDocument();
  expect(searchCryptoElement).toHaveTextContent('Bitcoin');
});

export {};