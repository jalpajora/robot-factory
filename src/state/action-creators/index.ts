import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { Action } from '../actions';
import AppLocalStorage from '../../utils/AppLocalStorage';
import { Robot } from '../';

const localStorage = new AppLocalStorage();

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
      localStorage.setList({ items });
      dispatch({
        type: ActionType.GENERATE_NEW_BATCH,
        payload: items,
      });
    } else {
      // Todo: Add fallback here
      localStorage.setList({ items: [] });
    }
  };
};

export const extinguishItem = (items: Robot[], id: number) => {
  return async (dispatch: Dispatch<Action>) => {
    const filtered = items
      .filter((item) => item.id === Number(id))
      .map((item) => {
        const statuses = item.statuses;

        return {
          ...item,
          statuses: statuses.filter((status) => status !== 'on fire'),
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

    const updatedState = items.map((item) =>
      item.id === responseData.id ? responseData : item
    );

    dispatch({
      type: ActionType.UPDATE_ITEM,
      payload: updatedState,
    });
    localStorage.setList({ items: updatedState });
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
      localStorage.setList({ items: updatedState });
    } catch {
      console.error('Something went wrong');
    }
  };
};
