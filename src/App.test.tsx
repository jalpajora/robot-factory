import { render } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId('app')).toBeInTheDocument();
});
