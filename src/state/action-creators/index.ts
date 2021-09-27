import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { Action } from '../actions';
import AppLocalStorage from '../../utils/AppLocalStorage';
import { Robot } from '../';

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
  const localStorage = new AppLocalStorage();

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

    let responseData;
    try {
      responseData = await response.json();
    } catch {
      responseData = await response;
    }
    console.log(responseData);
  };
  // TODO: Update localstorage here
  // TODO: Dispatch here
  // dispatch
};

export const recycleItem = (item: Robot) => {
  return async (dispatch: Dispatch<Action>) => {
    const response = await updateData(
      // TODO: Go back to this format
      '/robots/recycle/' + item.id,
      'DELETE'
    );

    let responseData;
    try {
      responseData = await response.json();
    } catch {
      responseData = await response;
    }
    console.log(responseData);
  };
  // TODO: Update localstorage here
  // TODO: Dispatch here
  // dispatch
};
