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
}

export interface QaStatus {
  forExtinguish?: number[];
  forRecycle?: number[];
  forSecondaryFactory?: number[];
  passedQa?: number[];
}

export interface GenerateNewBatchAction {
  type: ActionType.GENERATE_NEW_BATCH;
  payload: Robot[];
}

export interface UpdateItemAction {
  type: ActionType.UPDATE_ITEM;
  payload: Robot[];
}

export interface DeleteItemAction {
  type: ActionType.DELETE_ITEM;
  payload: Robot[];
}

export type Action =
  | GenerateNewBatchAction
  | UpdateItemAction
  | DeleteItemAction;
export interface State {
  items: Robot[];
  qaStatus?: QaStatus;
}
