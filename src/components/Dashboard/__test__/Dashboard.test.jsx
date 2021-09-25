import { render } from '@testing-library/react';
import MainDashboard from '../Main';
import QaDashboard from '../Qa';
import ReadyToShipDashboard from '../ReadyToShip';
import ShippingDashboard from '../Shipping';

test('renders main dashboard', () => {
  const { getByTestId } = render(<MainDashboard />);
  expect(getByTestId('db-main')).toBeInTheDocument();
});

test('renders "QA" dashboard', () => {
  const { getByTestId } = render(<QaDashboard />);
  expect(getByTestId('db-qa')).toBeInTheDocument();
});

test('renders "Ready to Ship" dashboard', () => {
  const { getByTestId } = render(<ReadyToShipDashboard />);
  expect(getByTestId('db-ready-to-ship')).toBeInTheDocument();
});

test('renders main dashboard', () => {
  const { getByTestId } = render(<ShippingDashboard />);
  expect(getByTestId('db-shipping')).toBeInTheDocument();
});
