import { Action, State } from '../actions';
import { ActionType } from '../action-types/index';

export const initialRobotsState: State = [];

const reducer = (state: State = initialRobotsState, action: Action) => {
  switch (action.type) {
    case ActionType.GENERATE_NEW_BATCH:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default reducer;
