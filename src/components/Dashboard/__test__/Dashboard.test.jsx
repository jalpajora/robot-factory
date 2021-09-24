import { render, RenderResult } from '@testing-library/react';
import Dashboard from '..';

let Component: RenderResult;
beforeEach(() => {
  Component = render(<Dashboard />);
});

test('renders dashboard', () => {
  expect(Component.getByRole('main')).toBeInTheDocument();
});

test('should render "QA" dashboard', () => {
  expect(Component.getByTestId('db-qa')).toBeInTheDocument();
});

test('should render "Ready to Ship" dashboard', () => {
  expect(Component.getByTestId('db-ready-to-ship')).toBeInTheDocument();
});

test('should render "Shipping" dashboard', () => {
  expect(Component.getByTestId('db-shipping')).toBeInTheDocument();
});
