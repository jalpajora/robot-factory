import { Action, State } from '../actions';
import { ActionType } from '../action-types/index';

export const initialRobotsState: State = {
  items: [],
};

const reducer = (state: State = initialRobotsState, action: Action) => {
  switch (action.type) {
    case ActionType.GENERATE_NEW_BATCH:
    case ActionType.UPDATE_ITEM:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
