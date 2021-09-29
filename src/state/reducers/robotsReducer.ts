import { Action, State, ShippingStatus } from '../actions';
import { ActionType } from '../action-types/index';
import { getQaStatus } from '../../utils/qaStatusHelpers';

export const initialRobotsState: State = {
  items: [],
  readyForShipping: [],
  shipments: [],
};

const reducer = (state: State = initialRobotsState, action: Action) => {
  switch (action.type) {
    case ActionType.GENERATE_NEW_BATCH:
      const newState = action.payload.reduce((prevState, currentState) => {
        const { items, readyForShipping } = prevState;

        if (currentState.shippingStatus === ShippingStatus.readyToShip) {
          return {
            ...prevState,
            items: items
              .filter((item) => item.id !== currentState.id)
              .map((item) => {
                return {
                  ...item,
                  qaStatus: getQaStatus(item),
                };
              }),
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
    case ActionType.RECYCLE_BULK_ITEMS:
      return {
        ...state,
        items: state.items
          .filter((item) => !action.payload.includes(item.id))
          .map((item) => {
            return {
              ...item,
              qaStatus: getQaStatus(item),
            };
          }),
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

    case ActionType.REMOVE_FROM_SHIPMENT:
      return {
        ...state,
        items: [...state.items, action.payload],
        readyForShipping: state.readyForShipping.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case ActionType.SEND_SHIPMENT:
      const { shipments } = action.payload;
      return {
        ...state,
        readyForShipping: state.readyForShipping.filter(
          (item) => !shipments.includes(item.id)
        ),
        shipments,
      };
    case ActionType.FETCH_SHIPMENTS:
      return {
        ...state,
        shipments: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
