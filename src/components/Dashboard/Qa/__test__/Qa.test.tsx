import { fireEvent, RenderResult, waitFor } from '@testing-library/react';
import App from '../../../App';
import { render } from '../../../../__test__/test-utils';

let Component: RenderResult;
let dashboard: HTMLElement;

beforeEach(async () => {
  Component = render(<App />);
  fireEvent.click(Component.getByText('QA', { selector: 'a' }));

  await waitFor(() => {
    dashboard = Component.getByTestId('db-qa');
  });
});

describe('QA: Inital page state:', () => {
  test('shows table with empty list', () => {
    expect(dashboard).toBeInTheDocument();

    const totalRows = dashboard.querySelectorAll('table tbody tr').length;
    expect(totalRows).toBe(0);
  });

  test('Shows "Generate Batch" button', () => {
    expect(dashboard.querySelector('.generate-batch-btn')).toBeInTheDocument();
  });

  test('Shows "Ready to QA robots? Click \'Generate Batch\' button" to start.', () => {
    const caption = dashboard.querySelector('.table-caption');
    expect(caption?.textContent).toMatch(/Ready to QA robots/);
  });
});

describe('QA: UI After clicking "Generate Batch" button', () => {
  test('displays table with data and action buttons at the top of the table', async () => {
    expect(dashboard).toBeInTheDocument();
    expect(dashboard.querySelectorAll('table tbody tr').length).toBe(0);

    fireEvent.click(
      Component.getByText('Generate Batch', { selector: 'button' })
    );

    await waitFor(() => {
      // 10 rows
      expect(dashboard.querySelectorAll('table tbody tr').length).toBe(10);

      // Action Buttons
      expect(
        dashboard.querySelector('.bulk-extinguish-btn')
      ).toBeInTheDocument();
      expect(dashboard.querySelector('.bulk-recycle-btn')).toBeInTheDocument();
      expect(dashboard.querySelector('.bulk-factory-btn')).toBeInTheDocument();
      expect(dashboard.querySelector('.bulk-pass-btn')).toBeInTheDocument();
    });
  });
});
