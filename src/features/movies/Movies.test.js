import React from 'react';
import { waitFor } from '@testing-library/dom';
import { render } from '../../testUtils';
import { Movies } from './Movies';

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props) => (props.in ? props.children : null),
  };
});

it('renders Movies component with loader', async () => {
  const { getByText, getByTestId } = render(<Movies />);
  expect(getByText(/movies/i)).toBeInTheDocument();
  expect(getByTestId('loader')).toBeInTheDocument();
  expect(getByTestId('list-menu-toggle')).toBeInTheDocument();
});

it('renders Movies component with list of movies', async () => {
  const { getByText, getAllByTestId, debug, queryByTestId } = render(
    <Movies />
  );
  expect(getByText(/movies/i)).toBeInTheDocument();
  await waitFor(() => {
    // Loader suppose to be hidden when movies will appear
    expect(queryByTestId('loader')).not.toBeInTheDocument();
    expect(getAllByTestId('movie-card'));
  });
});
