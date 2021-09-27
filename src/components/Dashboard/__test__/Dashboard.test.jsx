import { fireEvent, RenderResult, waitFor } from '@testing-library/react';
import App from '../../App';
import { render } from '../../../__test__/test-utils';

let Component: RenderResult;

beforeEach(async () => {
  Component = render(<App />);
});

test('renders main dashboard', async () => {
  fireEvent.click(Component.getByText(/Robot Factory/, { selector: 'a' }));

  await waitFor(() => {
    expect(Component.getByTestId('db-main')).toBeInTheDocument();
  });
});

test('renders "QA" dashboard', async () => {
  fireEvent.click(Component.getByText('QA', { selector: 'a' }));

  await waitFor(() => {
    expect(Component.getByTestId('db-qa')).toBeInTheDocument();
  });
});

test('renders "Ready to Ship" dashboard', async () => {
  fireEvent.click(Component.getByText('Ready to Ship', { selector: 'a' }));

  await waitFor(() => {
    expect(Component.getByTestId('db-ready-to-ship')).toBeInTheDocument();
  });
});

test('renders "Shipping" dashboard', async () => {
  fireEvent.click(Component.getByText('Shipping', { selector: 'a' }));

  await waitFor(() => {
    expect(Component.getByTestId('db-shipping')).toBeInTheDocument();
  });
});
