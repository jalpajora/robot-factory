import { render, RenderResult } from '@testing-library/react';
import Dashboard from '..';

let Component: RenderResult;
beforeEach(() => {
  Component = render(<Dashboard />);
});

test('renders dashboard', () => {
  expect(Component.getByRole('main')).toBeInTheDocument();
});
