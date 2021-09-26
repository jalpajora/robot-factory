import { ActionType } from '../action-types';

type RobotsStatuses = 'on fire' | 'rusty' | 'loose screws' | 'paint scratched';

export interface Robots {
  id: number;
  name: string;
  configuration: {
    hasSentience: boolean;
    hasWheels: boolean;
    hasTracks: boolean;
    numberOfRotors: number;
    Colour: string;
  };
  statuses: RobotsStatuses[];
}

export interface GenerateNewBatchAction {
  type: ActionType.GENERATE_NEW_BATCH;
  payload: Robots[];
}

export type Action = GenerateNewBatchAction;
export type State = Robots[];
