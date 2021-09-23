import { render, RenderResult } from '@testing-library/react';

import Layout from '../Layout';

let Component: RenderResult;
beforeEach(() => {
  Component = render(<Layout />);
});

test('layout must have a logo', () => {
  expect(Component.getByAltText('company logo')).toBeInTheDocument();
});

test('layout must have a logout', () => {
  expect(Component.getByTestId('logout-btn')).toBeInTheDocument();
});

test('layout must have an app header', () => {
  expect(Component.getByRole('header')).toBeInTheDocument();
});

test('layout must have an app footer', () => {
  expect(Component.getByRole('footer')).toBeInTheDocument();
});

test('layout must have a "QA" menu link', () => {
  expect(Component.getByRole('link', { label: 'QA' })).toBeInTheDocument();
});

test('layout must have a "Ready to Ship" link', () => {
  expect(
    Component.getByRole('link', { label: 'Ready to Ship' })
  ).toBeInTheDocument();
});

test('layout must have a "Shipping" link', () => {
  expect(
    Component.getByRole('link', { label: 'Shipping' })
  ).toBeInTheDocument();
});
