import { render, RenderResult, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { waitFor } from '@testing-library/dom';

import App from '..';

describe('App display', () => {
  let Component: RenderResult;
  beforeEach(() => {
    Component = render(<App />);
  });

  test('renders app', () => {
    expect(Component.getByTestId('app')).toBeInTheDocument();
  });

  test('layout must have an app header', () => {
    expect(Component.getByRole('navigation')).toBeInTheDocument();
  });

  test('layout must have a logo', () => {
    expect(Component.getByAltText('company logo')).toBeInTheDocument();
  });

  test('layout must have a logout', () => {
    expect(Component.getByTestId('logout-btn')).toBeInTheDocument();
  });

  test('layout must have a "QA" menu link', () => {
    expect(Component.getByText('QA', { selector: 'a' })).toBeInTheDocument();
  });

  test('layout must have a "Ready to Ship" link', () => {
    expect(
      Component.getByText('Ready to Ship', { selector: 'a' })
    ).toBeInTheDocument();
  });

  test('layout must have a "Shipping" link', () => {
    expect(
      Component.getByText('Shipping', { selector: 'a' })
    ).toBeInTheDocument();
  });
});

describe('When user clicks link', () => {
  let Component: RenderResult;
  beforeEach(() => {
    Component = render(
      <MemoryRouter>
        <Route path='/'>
          <App />
        </Route>
      </MemoryRouter>
    );
    return Component;
  });

  test('Logo link should render initial dashboard', () => {
    expect(Component.getByTestId('db-inventory')).toBeInTheDocument();
  });

  test('"QA" link should render "QA" dashboard', async () => {
    const { getByTestId, getByText } = Component;
    expect(getByTestId('db-inventory')).toBeInTheDocument();

    fireEvent.click(getByText('QA', { selector: 'a' }));
    await waitFor(() => {
      expect(getByTestId('db-qa')).toBeInTheDocument();
    });
  });

  test('"Ready to Ship" link should render "Ready to Ship" dashboard', async () => {
    const { getByTestId, getByText } = Component;
    expect(getByTestId('db-inventory')).toBeInTheDocument();

    fireEvent.click(getByText('QA', { selector: 'a' }));
    await waitFor(() => {
      expect(getByTestId('db-ready-to-ship')).toBeInTheDocument();
    });
  });

  test('"Shipping" link should render "Shipping" dashboard', async () => {
    const { getByTestId, getByText } = Component;
    expect(getByTestId('db-inventory')).toBeInTheDocument();

    fireEvent.click(getByText('QA', { selector: 'a' }));
    await waitFor(() => {
      expect(getByTestId('db-shipping')).toBeInTheDocument();
    });
  });
});
