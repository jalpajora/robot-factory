import { render, RenderResult } from '@testing-library/react';
import App from '..';

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
