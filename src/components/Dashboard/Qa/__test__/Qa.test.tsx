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
});

describe('QA: Extinguish:', () => {
  test('If robot has sentience and is on fire, "Extinguish" button should be displayed', () => {
    expect(dashboard.querySelectorAll('table tbody tr').length).toBe(10);

    dashboard.querySelectorAll('table tbody tr').forEach((element) => {
      const sentience = element.querySelector(
        'td[data-testid="col-sentience"]'
      );
      const statuses = element.querySelector('td[data-testid="col-statuses"]');

      if (
        sentience !== null &&
        statuses !== null &&
        sentience.textContent === 'Yes' &&
        statuses.textContent?.includes('on fire')
      ) {
        expect(
          element.querySelector('button.extinguish-btn')
        ).toBeInTheDocument();
      } else {
        expect(
          element.querySelector('button.extinguish-btn')
        ).not.toBeInTheDocument();
      }
    });
  });

  test('Removes "on fire" in status when Extinguish button is clicked', () => {
    // Go back to this
  });
});

// console.log(statuses);
// console.log(statuses?.textContent);
// expect(false).toBeTruthy();
// if (sentience?.textContent === 'Yes')
// expect(sentience?.textContent).toBe('Yes');

// expect(element.querySelector('button.recycle-btn')).toBeInTheDocument();

// expect(element.querySelector('button.pass-qa-btn')).toBeInTheDocument();

// expect(
//   element.querySelector('button.factory-second-btn')
// ).toBeInTheDocument();

// describe('QA: Recycle:', () => {
//   test('Clicks Recycle button with 0 selected rows', () => {});

//   test('Clicks Recycle button with all rows selected (1 item categorized as "For Recycle")', () => {});

//   test('Clicks Recycle button with few rows selected (items not categorized as "For Recycle")', () => {});

//   test('Clicks Recycle button with few rows selected (1 item categorized as "For Recycle")', () => {});
// });

// describe('QA: Pass QA:', () => {
//   test('Clicks Pass QA button with 0 selected rows', () => {});

//   test('Clicks Pass QA button with all rows selected (1 item categorized as "For Pass QA")', () => {});

//   test('Clicks Pass QA button with few rows selected (items not categorized as "For Pass QA")', () => {});

//   test('Clicks Pass QA button with few rows selected (1 item categorized as "For Pass QA")', () => {});
// });

// describe('QA: Factory Secondary:', () => {
//   test('Clicks Factory Secondary button with 0 selected rows', () => {});

//   test('Clicks Factory Secondary button with all rows selected (1 item categorized as "For Factory Secondary")', () => {});

//   test('Clicks Factory Secondary button with few rows selected (items not categorized as "For Factory Secondary")', () => {});

//   test('Clicks Factory Secondary button with few rows selected (1 item categorized as " For Factory Secondary")', () => {});
// });
