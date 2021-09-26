import { ActionType } from '../action-types';

export interface RobotsPayload {
  id: number;
  name: string;
  configuration: {
    hasSentience: boolean;
    hasWheels: boolean;
    hasTracks: boolean;
    numberOfRotors: number;
    Colour: string;
  };
  statuses: ['on fire', 'rusty', 'loose screws', 'paint scratched'];
}

export interface GenerateNewBatchAction {
  type: ActionType.GENERATE_NEW_BATCH;
  payload: RobotsPayload[];
}

export type Action = GenerateNewBatchAction;
export type State = RobotsPayload[];
