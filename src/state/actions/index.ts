import { ActionType } from '../action-types';

export type RobotStatuses =
  | 'on fire'
  | 'rusty'
  | 'loose screws'
  | 'paint scratched';

export interface RobotConfiguration {
  hasSentience: boolean;
  hasWheels: boolean;
  hasTracks: boolean;
  numberOfRotors: number;
  Colour: string;
}

export interface Robot {
  id: number;
  name: string;
  configuration: RobotConfiguration;
  statuses: RobotStatuses[];
  qaStatus?: QaStatus;
}

export type QaStatus = '' | 'Passed QA' | 'Factory Second' | 'Ready to Ship';

export interface GenerateNewBatchAction {
  type: ActionType.GENERATE_NEW_BATCH;
  payload: Robot[];
}

export interface UpdateItemAction {
  type: ActionType.EXTINGUISH_ITEM;
  payload: Robot;
}

export interface DeleteItemAction {
  type: ActionType.DELETE_ITEM;
  payload: Robot[];
}

export interface AddToShipmentAction {
  type: ActionType.ADD_TO_SHIPMENT;
  payload: Robot;
}

export type Action =
  | GenerateNewBatchAction
  | UpdateItemAction
  | DeleteItemAction
  | AddToShipmentAction;

export interface State {
  items: Robot[];
  readyForShipping: Robot[];
}
