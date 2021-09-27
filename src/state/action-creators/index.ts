import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { Action } from '../actions';
import { Robot } from '../';
import { getQaStatus } from '../../utils/qaStatusHelpers';

const fetchData = async () => {
  const response = await fetch(`/robots`);
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
    const items: Robot[] = await fetchData();

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

export const extinguishItem = (items: Robot[], id: number) => {
  return async (dispatch: Dispatch<Action>) => {
    const filtered = items
      .filter((item) => item.id === Number(id))
      .map((item) => {
        const statuses = item.statuses;

        const updatedItem = {
          ...item,
          statuses: statuses.filter((status) => status !== 'on fire'),
        };
        return {
          ...updatedItem,
          qaStatus: getQaStatus(updatedItem),
        };
      });

    const selectedItem = filtered[0];
    const response = await updateData(
      `/robots/${selectedItem.id}/extinguish`,
      'PUT',
      selectedItem
    );

    let responseData: Robot;
    try {
      responseData = await response.json();
    } catch {
      responseData = await response;
    }

    dispatch({
      type: ActionType.EXTINGUISH_ITEM,
      payload: responseData,
    });
  };
};

export const recycleItem = (items: Robot[], id: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      await updateData(
        // TODO: Go back to this format
        '/robots/recycle/' + id,
        'DELETE'
      );

      const updatedState = items.filter((item) => item.id !== id);

      dispatch({
        type: ActionType.DELETE_ITEM,
        payload: updatedState,
      });
    } catch {
      console.error('Something went wrong');
    }
  };
};

export const addToShipment = (items: Robot[], id: number) => {
  return (dispatch: Dispatch<Action>) => {
    const item = items.filter((item) => item.id === id)[0];
    dispatch({
      type: ActionType.ADD_TO_SHIPMENT,
      payload: item,
    });
  };
};
