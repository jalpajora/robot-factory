import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { Action } from '../actions';
import { Robot, ShippingStatus, State } from '../';
import { getUpdatedShippingStatus } from '../../utils/shippingStatusHelpers';

const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const updateData = async (url: string, method: string, item?: Robot) => {
  const { id, ...params } = item || {};
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();

  return data;
};

export const generateNewBatch = () => {
  return async (dispatch: Dispatch<Action>) => {
    const items: Robot[] = await fetchData('/robots');

    if (items.length) {
      // Success
      dispatch({
        type: ActionType.GENERATE_NEW_BATCH,
        payload: items,
      });
    } else {
      // Todo: Add fallback here
    }
  };
};

export const extinguishItem = (id: number) => {
  return async (dispatch: Dispatch<Action>) => {
    const response = await updateData(`/robots/${id}/extinguish`, 'POST');

    dispatch({
      type: ActionType.EXTINGUISH_ITEM,
      payload: response,
    });
  };
};

export const recycleItem = (items: Robot[], id: number) => {
  return async (dispatch: Dispatch<Action>) => {
    const response = await fetch(`/robots/recycle/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await response.json();

    dispatch({
      type: ActionType.DELETE_ITEM,
      payload: [id],
    });
  };
};

export const recycleItems = (ids: number[]) => {
  return async (dispatch: Dispatch<Action>) => {
    const response = await fetch('/robots/recycle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recycleRobots: ids }),
    });

    await response.json();

    dispatch({
      type: ActionType.RECYCLE_BULK_ITEMS,
      payload: ids,
    });
  };
};

export const addToShipment = (items: Robot[], id: number) => {
  return async (dispatch: Dispatch<Action>) => {
    const item = items
      .filter((item) => item.id === id)
      .map((item) => ({
        ...item,
        shippingStatus: ShippingStatus.readyToShip,
      }))[0];

    const response = await updateData(`/robots/${id}`, 'PUT', item);

    dispatch({
      type: ActionType.ADD_TO_SHIPMENT,
      payload: response,
    });
  };
};

export const removeFromShipment = (items: Robot[], id: number) => {
  return async (dispatch: Dispatch<Action>) => {
    const item = getUpdatedShippingStatus(items, id, ShippingStatus.default);

    const response = await updateData(`/robots/${id}`, 'PUT', item);

    dispatch({
      type: ActionType.REMOVE_FROM_SHIPMENT,
      payload: response,
    });
  };
};

export const sendShipment = (shipments: Robot[], id: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    const response = await fetch('/shipments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();

    dispatch({
      type: ActionType.SEND_SHIPMENT,
      payload: data,
    });
  };
};

// export const getShipments = () => {
//   return async (dispatch: Dispatch<Action>) => {
//     const items: Robot[] = await fetchData('/shipments');

//     if (items.length) {
//       // Success
//       dispatch({
//         type: ActionType.GENERATE_NEW_BATCH,
//         payload: items,
//       });
//     } else {
//       // Todo: Add fallback here
//     }
//   };
// };
