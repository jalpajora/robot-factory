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
  shippingStatus?: ShippingStatus;
}

export type QaStatus = '' | 'Passed QA' | 'Factory Second';
export enum ShippingStatus {
  default = '',
  readyToShip = 'Ready to Ship',
  shipment = 'Shipment',
}

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
  payload: number[];
}

export interface AddToShipmentAction {
  type: ActionType.ADD_TO_SHIPMENT;
  payload: Robot;
}

export interface RemoveFromShipmentAction {
  type: ActionType.REMOVE_FROM_SHIPMENT;
  payload: Robot;
}

export interface SendToShipmentAction {
  type: ActionType.SEND_SHIPMENT;
  payload: {
    items: Robot[];
    shipments: number[];
  };
}

export interface FetchShipmentsAction {
  type: ActionType.FETCH_SHIPMENTS;
  payload: number[];
}

export interface BulkRecycleAction {
  type: ActionType.RECYCLE_BULK_ITEMS;
  payload: number[];
}

export type Action =
  | GenerateNewBatchAction
  | UpdateItemAction
  | DeleteItemAction
  | AddToShipmentAction
  | RemoveFromShipmentAction
  | SendToShipmentAction
  | FetchShipmentsAction
  | BulkRecycleAction;

export interface State {
  items: Robot[];
  readyForShipping: Robot[];
  shipments: number[];
}
