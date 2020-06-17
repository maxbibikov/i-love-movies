import React from 'react';
import { render, wait } from './testUtils';
import App from './App';

it('app renders with redux defaults and shows navigation, loader and footer', () => {
  const { getByText, getByTestId, getByTitle } = render(<App />);
  expect(getByTestId('logo')).toHaveTextContent(/i*movies/i);
  expect(getByTitle('love')).toBeInTheDocument();
  expect(getByTestId('loader')).toBeInTheDocument();

  // footer
  expect(getByText(/max bibikov/i)).toBeInTheDocument();
  expect(getByTitle('the movie db')).toBeInTheDocument();
});

it('app shows list of movies', async () => {
  const { getByText, queryByTestId } = render(<App />);
  await wait(() => {
    // Loader suppose to be hidden when movies will appear
    const loader = queryByTestId('loader');
    expect(loader).toBeNull();
    const movie = getByText(/the shawshank redemption/i);
  });
});
