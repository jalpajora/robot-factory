import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { Action } from '../actions';
import AppLocalStorage from '../../utils/AppLocalStorage';

const API_URL = 'http://localhost:5000';

const fetchData = async () => {
  const response = await fetch(`${API_URL}/robots`);
  const data = await response.json();

  return data;
};

export const generateNewBatch = () => {
  const localStorage = new AppLocalStorage();

  return async (dispath: Dispatch<Action>) => {
    const data = await fetchData();
    localStorage.setList(data);

    dispath({
      type: ActionType.GENERATE_NEW_BATCH,
      payload: data,
    });
  };
};
