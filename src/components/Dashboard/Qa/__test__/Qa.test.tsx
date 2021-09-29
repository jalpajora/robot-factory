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
  test('shows table with 10 robots list', async () => {
    expect(dashboard).toBeInTheDocument();

    await Component.findByRole('table');
    const totalRows = dashboard.querySelectorAll('table tbody tr').length;
    expect(totalRows).toBe(10);
  });
});

describe('QA: Extinguish:', () => {
  test('If robot has sentience and is on fire, "Extinguish" button should be displayed', async () => {
    await Component.findByRole('table');
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
  test('If robot has fewer than 3 or greater than 8 rotors, "Recycle" button should be displayed', async () => {
    await Component.findByRole('table');
    dashboard.querySelectorAll('table tbody tr').forEach((element) => {
      const rotors = element.querySelector('[data-testid="col-rotors"]');
      if (rotors !== null) {
        const noOfRotors = Number(rotors.textContent);
        if (noOfRotors < 3 || noOfRotors > 8) {
          expect(
            element.querySelector('button.recycle-btn')
          ).toBeInTheDocument();
        }
      }
    });
  });

  test('If robot has any number of rotors and is color blue, "Recycle" button should be displayed', async () => {
    await Component.findByRole('table');
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

  test('If robot has wheels and tracks, "Recycle" button should be displayed', async () => {
    await Component.findByRole('table');
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

describe('QA: Pass QA:', () => {
  test('If item is tagged as "Passed QA", "Add to Shipment" button should display in page', async () => {
    await Component.findByRole('table');
    dashboard.querySelectorAll('table tbody tr').forEach((element) => {
      const qaStatus = element.querySelector('[data-testid="qa-status"]');

      if (qaStatus?.textContent?.includes('Passed QA')) {
        const addShipment = element.querySelector('.add-shipment-btn');
        expect(addShipment).toBeInTheDocument();
      }
    });
  });

  test('When "Add to Shipment" button is clicked, item should be moved to "Ready to Ship" panel', async () => {
    await Component.findByRole('table');
    dashboard.querySelectorAll('table tbody tr').forEach(async (element) => {
      const qaStatus = element.querySelector('[data-testid="qa-status"]');

      if (qaStatus?.textContent?.includes('Passed QA')) {
        const addShipment = element.querySelector(
          '.add-shipment-btn'
        ) as Element;

        fireEvent.click(addShipment);
        expect(element).not.toBeInTheDocument();
      }
    });
  });
});

describe('QA: Factory Secondary:', () => {
  test('If item is tagged as "Factory Secondary", "Add to Shipment" button should display in page', async () => {
    await Component.findByRole('table');
    dashboard.querySelectorAll('table tbody tr').forEach((element) => {
      const qaStatus = element.querySelector('[data-testid="qa-status"]');

      if (qaStatus?.textContent?.includes('Factory Secondary')) {
        const addShipment = element.querySelector('.add-shipment-btn');
        expect(addShipment).toBeInTheDocument();
      }
    });
  });

  test('When "Add to Shipment" button is clicked, item should be moved to "Ready to Ship" panel', async () => {
    await Component.findByRole('table');
    dashboard.querySelectorAll('table tbody tr').forEach(async (element) => {
      const qaStatus = element.querySelector('[data-testid="qa-status"]');

      if (qaStatus?.textContent?.includes('Factory Secondary')) {
        const addShipment = element.querySelector(
          '.add-shipment-btn'
        ) as Element;

        fireEvent.click(addShipment);
        expect(element).not.toBeInTheDocument();
      }
    });
  });
});
