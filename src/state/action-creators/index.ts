import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { Action } from '../actions';

const API_URL = 'http://localhost:5000';

const fetchData = async () => {
  const response = await fetch(`${API_URL}/robots`);
  const data = await response.json();

  return data;
};

export const generateNewBatch = () => {
  return async (dispath: Dispatch<Action>) => {
    const data = await fetchData();

    dispath({
      type: ActionType.GENERATE_NEW_BATCH,
      payload: data,
    });
  };
};
