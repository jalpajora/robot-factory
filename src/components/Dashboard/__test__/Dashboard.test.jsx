import { render, RenderResult } from '@testing-library/react';
import { MainDashboard } from '../Main';

let Component: RenderResult;
beforeEach(() => {
  Component = render(<MainDashboard />);
});

test('renders dashboard', () => {
  expect(Component.getByRole('main')).toBeInTheDocument();
});
