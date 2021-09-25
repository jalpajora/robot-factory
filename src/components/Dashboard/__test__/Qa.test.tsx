import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import QaDashboard from '../Qa';

describe('QA: Inital page state:', () => {
  let Component: RenderResult;
  let dashboard: HTMLElement;
  beforeEach(() => {
    Component = render(<QaDashboard />);
    dashboard = Component.getByTestId('db-qa');
  });

  test('shows table with empty list', () => {
    expect(dashboard).toBeInTheDocument();

    const totalRows = dashboard.querySelectorAll('table tbody tr').length;
    expect(totalRows).toBe(0);
  });

  test('Shows "Generate Batch" button', () => {
    expect(dashboard.querySelector('.generate-batch-btn')).toBeInTheDocument();
  });

  test('Shows "Ready to QA robots? Click \'Generate Batch\' button" to start.', () => {
    const caption = dashboard.querySelector('table.qa-table caption');
    expect(caption?.textContent).toMatch(/Ready to QA robots/);
  });
});

describe('QA: UI After clicking "Generate Batch" button', () => {
  let Component: RenderResult;
  let dashboard: HTMLElement;
  beforeEach(() => {
    Component = render(<QaDashboard />);
    dashboard = Component.getByTestId('db-qa');
  });

  test('displays table with data', async () => {
    expect(dashboard).toBeInTheDocument();
    expect(dashboard.querySelectorAll('table tbody tr').length).toBe(0);

    fireEvent.click(
      Component.getByText('Generate Batch', { selector: 'button' })
    );

    await waitFor(() => {
      // 10 rows
      expect(dashboard.querySelectorAll('table tbody tr').length).toBe(10);
    });
  });

  test('displays action buttons at the top of the table', async () => {
    expect(dashboard).toBeInTheDocument();
    expect(dashboard.querySelectorAll('table tbody tr').length).toBe(0);

    fireEvent.click(
      Component.getByText('Generate Batch', { selector: 'button' })
    );

    await waitFor(() => {
      expect(
        dashboard.querySelector('.bulk-extinguish-btn')
      ).toBeInTheDocument();
      expect(dashboard.querySelector('.bulk-recycle-btn')).toBeInTheDocument();
      expect(dashboard.querySelector('.bulk-qa-btn')).toBeInTheDocument();
      expect(dashboard.querySelector('.bulk-factory-btn')).toBeInTheDocument();
      expect(dashboard.querySelector('.bulk-pass-btn')).toBeInTheDocument();
    });
  });
});
