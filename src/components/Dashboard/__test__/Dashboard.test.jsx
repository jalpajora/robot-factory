import { render, RenderResult } from '@testing-library/react';

import Layout from '..';

let Component: RenderResult;
beforeEach(() => {
  Component = render(<Layout />);
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
