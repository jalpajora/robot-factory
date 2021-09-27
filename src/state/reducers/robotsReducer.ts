import { Action, State } from '../actions';
import { ActionType } from '../action-types/index';
import { getQaStatus } from '../../utils/qaStatusHelpers';

export const initialRobotsState: State = {
  items: [],
  readyForShipping: [],
};

const reducer = (state: State = initialRobotsState, action: Action) => {
  switch (action.type) {
    case ActionType.GENERATE_NEW_BATCH:
      const newState = action.payload.reduce((prevState, currentState) => {
        const { items, readyForShipping } = prevState;
        console.log(currentState);
        if (getQaStatus(currentState) === 'Ready to Ship') {
          return {
            ...prevState,
            readyForShipping: [...readyForShipping, currentState],
          };
        }

        return {
          ...prevState,
          items: [...items, currentState],
        };
      }, initialRobotsState);

      return newState;

    case ActionType.DELETE_ITEM:
      return {
        ...state,
        items: action.payload,
      };

    case ActionType.EXTINGUISH_ITEM:
      const item = action.payload;
      const items = state.items.map((currentItem) => {
        if (currentItem.id === item.id) {
          return { ...item, qaStatus: getQaStatus(item) };
        }
        return currentItem;
      });

      return {
        ...state,
        items,
      };

    case ActionType.ADD_TO_SHIPMENT:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        readyForShipping: [...state.readyForShipping, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
