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
      const sentience = element.querySelector('[data-testid="col-sentience"]');
      const statuses = element.querySelector('[data-testid="col-statuses"]');

      if (
        sentience !== null &&
        statuses !== null &&
        sentience.textContent === 'Yes' &&
        statuses.textContent?.includes('on fire')
      ) {
        expect(
          element.querySelector('button.extinguish-btn')
        ).toBeInTheDocument();
      }
    });
  });

  test('Removes "on fire" in status when Extinguish button is clicked', () => {
    // Go back to this
  });
});

describe('QA: Recycle:', () => {
  test('If robot has fewer than 3 or greater than 8 rotors, "Recycle" button should be displayed', () => {
    dashboard.querySelectorAll('table tbody tr').forEach((element) => {
      const rotors = element.querySelector('[data-testid="col-rotors"]');
      console.log(rotors?.textContent);
      if (rotors !== null) {
        console.log('okay');
        const noOfRotors = Number(rotors.textContent);
        if (noOfRotors < 3 || noOfRotors > 8) {
          expect(
            element.querySelector('button.recycle-btn')
          ).toBeInTheDocument();
        }
      }
    });
  });

  test('If robot has any number of rotors and is color blue, "Recycle" button should be displayed', () => {
    dashboard.querySelectorAll('table tbody tr').forEach((element) => {
      const rotors = element.querySelector('[data-testid="col-rotors"]');
      const colour = element.querySelector('[data-testid="col-colour"]');

      if (rotors !== null && colour !== null) {
        const noOfRotors = Number(rotors.textContent);
        const colourText = (colour.textContent || '').toLowerCase();

        if (noOfRotors > 0 && colourText === 'blue') {
          expect(
            element.querySelector('button.recycle-btn')
          ).toBeInTheDocument();
        }
      }
    });
  });

  test('If robot has wheels and tracks, "Recycle" button should be displayed', () => {
    dashboard.querySelectorAll('table tbody tr').forEach((element) => {
      const wheels = element.querySelector('[data-testid="col-wheels"]');
      const tracks = element.querySelector('[data-testid="col-tracks"]');

      if (wheels !== null && tracks !== null) {
        if (
          wheels.textContent?.includes('Yes') &&
          tracks.textContent?.includes('Yes')
        ) {
          expect(
            element.querySelector('button.recycle-btn')
          ).toBeInTheDocument();
        }
      }
    });
  });
});

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
