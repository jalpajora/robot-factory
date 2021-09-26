import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import AppLocalStorage from '../utils/AppLocalStorage';

const getPersistedState = () => {
  const localStorage = new AppLocalStorage();
  const list = localStorage.getList();

  return {
    robots: list,
  };
};

export const store = createStore(
  reducers,
  getPersistedState(),
  applyMiddleware(thunk)
);
